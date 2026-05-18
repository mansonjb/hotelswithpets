#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Auto-translate city-guide JSON files from ES → PT.

Idempotent: only adds Pt fields where Es exists and Pt doesn't.
Runs:
1. Insert pt: counterpart for every es: field (string or array)
2. Apply comprehensive ES→PT phrase dictionary
3. Apply post-pass fixes (contractions, gender, false friends)
4. Restore mangled digits from ES siblings (years etc.)

Usage:
    python3 scripts/translate-to-pt.py           # process all city-guides
    python3 scripts/translate-to-pt.py heraklion # process specific cities
"""
import re
import json
import sys
import glob
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# ── Phrase dictionary (ordered: longest first) ───────────────────────────────
REPLACEMENTS = [
    # Multi-word phrases
    (r'\bperros? de asistencia\b', lambda m: 'cães de assistência' if m.group(0).startswith('perros') else 'cão de assistência'),
    (r'\bperros con correa\b', 'cães com trela'),
    (r'\bperro con correa\b', 'cão com trela'),
    (r'\bzonas? sin correa\b', lambda m: 'zonas sem trela' if 'zonas' in m.group(0) else 'zona sem trela'),
    (r'\bárea sin correa\b', 'área sem trela'),
    (r'\bsin correa\b', 'sem trela'),
    (r'\bcon correa\b', 'com trela'),
    (r'\bcasco antiguo\b', 'centro histórico'),
    (r'\bdog-friendly\b', 'pet-friendly'),
    (r'\btransportín\b', 'transportadora'),
    (r'\btransportínes\b', 'transportadoras'),
    (r'\btodo el año\b', 'o ano inteiro'),
    (r'\btoda la ciudad\b', 'toda a cidade'),
    (r'\btoda la zona\b', 'toda a zona'),
    (r'\btoda la red\b', 'toda a rede'),
    (r'\btoda la\b', 'toda a'),
    (r'\btodo el\b', 'todo o'),
    (r'\btodos los\b', 'todos os'),
    (r'\btodas las\b', 'todas as'),
    (r'\bla mayoría de los\b', 'a maioria dos'),
    (r'\bla mayoría de las\b', 'a maioria das'),
    (r'\bla mayoría de\b', 'a maioria de'),
    (r'\bal año\b', 'ao ano'),
    (r'\bal día\b', 'ao dia'),
    (r'\bdel río\b', 'do rio'),
    (r'\bdel mar\b', 'do mar'),
    (r'\bdel siglo\b', 'do século'),
    (r'\bdel norte\b', 'do norte'),
    (r'\bdel sur\b', 'do sul'),
    (r'\bdel este\b', 'do leste'),
    (r'\bdel oeste\b', 'do oeste'),
    (r'\bdel centro\b', 'do centro'),
    (r'\bal sur del\b', 'a sul do'),
    (r'\bal norte del\b', 'a norte do'),
    (r'\bal sur de\b', 'a sul de'),
    (r'\bal norte de\b', 'a norte de'),
    (r'\bal este de\b', 'a leste de'),
    (r'\bal oeste de\b', 'a oeste de'),
    (r'\ba pie\b', 'a pé'),
    (r'\ben coche\b', 'de carro'),
    (r'\ben tren\b', 'de comboio'),
    (r'\ben autobús\b', 'de autocarro'),
    (r'\ben taxi\b', 'de táxi'),
    (r'\ben bici\b', 'de bicicleta'),
    (r'\ben metro\b', 'no metro'),
    (r'\ben tranvía\b', 'no elétrico'),
    (r'\ben todas partes\b', 'em todo o lado'),
    (r'\bincluso en\b', 'mesmo em'),
    (r'\bincluso\b', 'mesmo'),
    (r'\ba diferencia de\b', 'ao contrário de'),
    (r'\ba pesar de\b', 'apesar de'),
    (r'\bsegún\b', 'segundo'),
    (r'\bcerca del centro\b', 'perto do centro'),
    (r'\bcon vistas? a la\b', 'com vista para a'),
    (r'\bcon vistas? al\b', 'com vista para o'),
    (r'\bla más bella\b', 'a mais bela'),
    (r'\bel más bello\b', 'o mais belo'),
    (r'\bla más grande\b', 'a maior'),
    (r'\bel más grande\b', 'o maior'),
    (r'\bla más pequeña\b', 'a mais pequena'),
    (r'\bel más pequeño\b', 'o mais pequeno'),
    (r'\bsin límite\b', 'sem limite'),
    (r'\bsin embargo\b', 'no entanto'),
    (r'\bsin\b', 'sem'),

    # City names that should be localized to PT
    (r'\bÁmsterdam\b', 'Amesterdão'),
    (r'\bOporto\b', 'Porto'),
    (r'\bColonia\b', 'Colónia'),
    (r'\bFráncfort\b', 'Frankfurt'),
    (r'\bMúnich\b', 'Munique'),
    (r'\bMarsella\b', 'Marselha'),
    (r'\bMilán\b', 'Milão'),
    (r'\bGinebra\b', 'Genebra'),
    (r'\bRotterdam\b', 'Roterdão'),
    (r'\bVarsovia\b', 'Varsóvia'),
    (r'\bCracovia\b', 'Cracóvia'),
    (r'\bBerlín\b', 'Berlim'),
    (r'\bHelsinki\b', 'Helsínquia'),
    (r'\bBruselas\b', 'Bruxelas'),
    (r'\bAmberes\b', 'Antuérpia'),
    (r'\bCopenhague\b', 'Copenhaga'),
    (r'\bZúrich\b', 'Zurique'),
    (r'\bSevilla\b', 'Sevilha'),

    # Single ES → PT
    (r'\bautobuses\b', 'autocarros'),
    (r'\bautobús\b', 'autocarro'),
    (r'\btranvías\b', 'elétricos'),
    (r'\btranvía\b', 'elétrico'),
    (r'\bcoches\b', 'carros'),
    (r'\bcoche\b', 'carro'),
    (r'\btrenes\b', 'comboios'),
    (r'\btren\b', 'comboio'),
    (r'\bbilletes\b', 'bilhetes'),
    (r'\bbillete\b', 'bilhete'),
    (r'\bmedia tarifa\b', 'meio preço'),
    (r'\bmedio precio\b', 'meio preço'),
    (r'\bdesde\b', 'a partir de'),
    (r'\bhasta\b', 'até'),
    (r'\baceptan\b', 'aceitam'),
    (r'\bacepta\b', 'aceita'),
    (r'\baceptados\b', 'aceites'),
    (r'\baceptado\b', 'aceite'),
    (r'\baceptar\b', 'aceitar'),
    (r'\bbienvenidos\b', 'bem-vindos'),
    (r'\bbienvenidas\b', 'bem-vindas'),
    (r'\bbienvenido\b', 'bem-vindo'),
    (r'\bcaminables\b', 'pedonais'),
    (r'\bcaminable\b', 'pedonal'),
    (r'\bsenderos\b', 'trilhos'),
    (r'\bsendero\b', 'trilho'),
    (r'\bpaseos\b', 'passeios'),
    (r'\bpaseo\b', 'passeio'),
    (r'\bcallejones\b', 'ruelas'),
    (r'\bcallejón\b', 'ruela'),
    (r'\bcalles\b', 'ruas'),
    (r'\bcalle\b', 'rua'),
    (r'\bplaza central\b', 'praça central'),
    (r'\bplazas\b', 'praças'),
    (r'\bplaza\b', 'praça'),
    (r'\bjardines\b', 'jardins'),
    (r'\bjardín\b', 'jardim'),
    (r'\bparques\b', 'parques'),
    (r'\bparque\b', 'parque'),
    (r'\bbosques\b', 'florestas'),
    (r'\bbosque\b', 'floresta'),
    (r'\bcolinas\b', 'colinas'),
    (r'\bcolina\b', 'colina'),
    (r'\borillas\b', 'margens'),
    (r'\borilla\b', 'margem'),
    (r'\bpraderas\b', 'pradarias'),
    (r'\bpradera\b', 'pradaria'),
    (r'\bcésped\b', 'relva'),
    (r'\bárboles\b', 'árvores'),
    (r'\bárbol\b', 'árvore'),
    (r'\bterrazas\b', 'esplanadas'),
    (r'\bterraza\b', 'esplanada'),
    (r'\brestaurantes\b', 'restaurantes'),
    (r'\brestaurante\b', 'restaurante'),
    (r'\bcena\b', 'jantar'),
    (r'\balmuerzo\b', 'almoço'),
    (r'\bdesayuno\b', 'pequeno-almoço'),
    (r'\baeropuertos\b', 'aeroportos'),
    (r'\baeropuerto\b', 'aeroporto'),
    (r'\bvuelos\b', 'voos'),
    (r'\bvuelo\b', 'voo'),
    (r'\bcompañía aérea\b', 'companhia aérea'),
    (r'\baerolínea\b', 'companhia aérea'),
    (r'\bbañarse\b', 'banhar-se'),
    (r'\bbaños\b', 'banhos'),
    (r'\bbaño\b', 'banho'),
    (r'\baguas\b', 'águas'),
    (r'\bagua\b', 'água'),
    (r'\barena\b', 'areia'),
    (r'\bpiedras\b', 'pedras'),
    (r'\bpiedra\b', 'pedra'),
    (r'\bperfectamente\b', 'perfeitamente'),
    (r'\bperfectos\b', 'perfeitos'),
    (r'\bperfectas\b', 'perfeitas'),
    (r'\bperfecto\b', 'perfeito'),
    (r'\bperfecta\b', 'perfeita'),
    (r'\bestancias\b', 'estadias'),
    (r'\bestancia\b', 'estadia'),
    (r'\balojamientos\b', 'alojamentos'),
    (r'\balojamiento\b', 'alojamento'),
    (r'\bhoteles\b', 'hotéis'),
    (r'\bcaninas\b', 'caninas'),
    (r'\bcaninos\b', 'caninos'),
    (r'\bcanina\b', 'canina'),
    (r'\bcanino\b', 'canino'),
    (r'\bperros\b', 'cães'),
    (r'\bperro\b', 'cão'),
    (r'\bmascotas\b', 'animais'),
    (r'\bmascota\b', 'animal'),
    (r'\bcerca del\b', 'perto do'),
    (r'\bcerca de la\b', 'perto da'),
    (r'\bcerca de\b', 'perto de'),
    (r'\blejos de\b', 'longe de'),
    (r'\bmuy\b', 'muito'),
    (r'\bmás\b', 'mais'),
    (r'\bmenos\b', 'menos'),
    (r'\bmuchos\b', 'muitos'),
    (r'\bmuchas\b', 'muitas'),
    (r'\bmucho\b', 'muito'),
    (r'\bmucha\b', 'muita'),
    (r'\bpocos\b', 'poucos'),
    (r'\bpocas\b', 'poucas'),
    (r'\bpoco\b', 'pouco'),
    (r'\bpoca\b', 'pouca'),
    (r'\bsiempre\b', 'sempre'),
    (r'\bnunca\b', 'nunca'),
    (r'\btambién\b', 'também'),
    (r'\badem(?:á|a)s\b', 'além disso'),
    (r'\bpero\b', 'mas'),
    (r'\baunque\b', 'embora'),
    (r'\bporque\b', 'porque'),
    (r'\bcuando\b', 'quando'),
    (r'\bdonde\b', 'onde'),
    (r'\bcómo\b', 'como'),
    (r'\bes uno de\b', 'é um dos'),
    (r'\bes una de\b', 'é uma das'),
    (r'\bes el más\b', 'é o mais'),
    (r'\bes la más\b', 'é a mais'),
    (r'\bsuelen ser\b', 'costumam ser'),
    (r'\bsuelen\b', 'costumam'),
    (r'\bpueden\b', 'podem'),
    (r'\bpuede\b', 'pode'),
    (r'\btienen\b', 'têm'),
    (r'\btiene\b', 'tem'),
    (r'\blos mejores\b', 'os melhores'),
    (r'\blas mejores\b', 'as melhores'),
    (r'\bel mejor\b', 'o melhor'),
    (r'\bla mejor\b', 'a melhor'),
    (r'\bmejores\b', 'melhores'),
    (r'\bmejor\b', 'melhor'),
    (r'\bestos\b', 'estes'),
    (r'\bestas\b', 'estas'),
    (r'\beste\b', 'este'),
    (r'\besta\b', 'esta'),
    (r'\baquí\b', 'aqui'),
    (r'\ballí\b', 'ali'),
    (r'\bprecios\b', 'preços'),
    (r'\bprecio\b', 'preço'),
    (r'\bgratis\b', 'grátis'),
    (r'\bgratuito\b', 'gratuito'),
    (r'\bgratuita\b', 'gratuita'),
    (r'\bclínicas\b', 'clínicas'),
    (r'\bclínica\b', 'clínica'),
    (r'\bveterinarios\b', 'veterinários'),
    (r'\bveterinario\b', 'veterinário'),
    (r'\bveterinarias\b', 'veterinárias'),
    (r'\bveterinaria\b', 'veterinária'),
    (r'\bemergencias\b', 'emergências'),
    (r'\bemergencia\b', 'emergência'),
    (r'\burgencias\b', 'urgências'),
    (r'\burgencia\b', 'urgência'),
    (r'\bdías\b', 'dias'),
    (r'\bdía\b', 'dia'),
    (r'\bnoches\b', 'noites'),
    (r'\bnoche\b', 'noite'),
    (r'\bmañana\b', 'manhã'),
    (r'\bcalor\b', 'calor'),
    (r'\bfríos\b', 'frios'),
    (r'\bfrío\b', 'frio'),
    (r'\bfría\b', 'fria'),
    (r'\bcaliente\b', 'quente'),
    (r'\bclima\b', 'clima'),
    (r'\btemperaturas\b', 'temperaturas'),
    (r'\btemperatura\b', 'temperatura'),
    (r'\bverano\b', 'verão'),
    (r'\binvierno\b', 'inverno'),
    (r'\botoño\b', 'outono'),
    (r'\bprimavera\b', 'primavera'),
    (r'\bservicios\b', 'serviços'),
    (r'\bservicio\b', 'serviço'),
    (r'\bbarrios\b', 'bairros'),
    (r'\bbarrio\b', 'bairro'),
    (r'\bedificios\b', 'edifícios'),
    (r'\bedificio\b', 'edifício'),
    (r'\bciudades\b', 'cidades'),
    (r'\bciudad\b', 'cidade'),
    (r'\bregiones\b', 'regiões'),
    (r'\bregión\b', 'região'),
    (r'\bpaíses\b', 'países'),
    (r'\bpaís\b', 'país'),
    (r'\bsiglos\b', 'séculos'),
    (r'\bsiglo\b', 'século'),
    (r'\baños\b', 'anos'),
    (r'\baño\b', 'ano'),
    (r'\bhabitantes\b', 'habitantes'),
    (r'\bhabitante\b', 'habitante'),
    (r'\bdentro de\b', 'dentro de'),
    (r'\bfuera de\b', 'fora de'),
    (r'\bsólo\b', 'só'),
    (r'\bsolo\b', 'só'),
    (r'\bllevar\b', 'levar'),
    (r'\bllegar\b', 'chegar'),
    (r'\bllamar\b', 'ligar'),
    (r'\bllaman\b', 'ligam'),
    (r'\bllama\b', 'liga'),
    (r'\bllamado\b', 'chamado'),
    (r'\bllamada\b', 'chamada'),
    (r'\bcaminata\b', 'caminhada'),
    (r'\bcaminatas\b', 'caminhadas'),
    (r'\bcaminar\b', 'caminhar'),
    (r'\bplayas\b', 'praias'),
    (r'\bplaya\b', 'praia'),
    (r'\bcosta\b', 'costa'),
    (r'\bríos\b', 'rios'),
    (r'\brío\b', 'rio'),
    (r'\blagos\b', 'lagos'),
    (r'\blago\b', 'lago'),
    (r'\bpuentes\b', 'pontes'),
    (r'\bpuente\b', 'ponte'),
    (r'\bcastillos\b', 'castelos'),
    (r'\bcastillo\b', 'castelo'),
    (r'\biglesias\b', 'igrejas'),
    (r'\biglesia\b', 'igreja'),
    (r'\bcatedrales\b', 'catedrais'),
    (r'\bcatedral\b', 'catedral'),
    (r'\btorres\b', 'torres'),
    (r'\btorre\b', 'torre'),
    (r'\bmurallas\b', 'muralhas'),
    (r'\bmuralla\b', 'muralha'),
    (r'\bpalacios\b', 'palácios'),
    (r'\bpalacio\b', 'palácio'),
    (r'\bmercados\b', 'mercados'),
    (r'\bmercado\b', 'mercado'),
    (r'\bmuseos\b', 'museus'),
    (r'\bmuseo\b', 'museu'),
    (r'\buniversidades\b', 'universidades'),
    (r'\buniversidad\b', 'universidade'),
    (r'\bestudiantes\b', 'estudantes'),
    (r'\bestudiante\b', 'estudante'),
    (r'\bhistórico\b', 'histórico'),
    (r'\bhistórica\b', 'histórica'),
    (r'\bhistóricos\b', 'históricos'),
    (r'\bhistóricas\b', 'históricas'),
    (r'\bhistoria\b', 'história'),
    (r'\bcultural\b', 'cultural'),
    (r'\bculturales\b', 'culturais'),
    (r'\bcultura\b', 'cultura'),
    (r'\brománico\b', 'românico'),
    (r'\brománica\b', 'românica'),
    (r'\bgótico\b', 'gótico'),
    (r'\bgótica\b', 'gótica'),
    (r'\bbarroco\b', 'barroco'),
    (r'\bbarroca\b', 'barroca'),
    (r'\brenacentista\b', 'renascentista'),
    (r'\bmedievales\b', 'medievais'),
    (r'\bmedieval\b', 'medieval'),

    # Articles + preps
    (r'\ben el\b', 'no'),
    (r'\ben la\b', 'na'),
    (r'\ben los\b', 'nos'),
    (r'\ben las\b', 'nas'),
    (r'\ben un\b', 'num'),
    (r'\ben una\b', 'numa'),
    (r'\bdel\b', 'do'),
    (r'\bcon el\b', 'com o'),
    (r'\bcon la\b', 'com a'),
    (r'\bcon los\b', 'com os'),
    (r'\bcon las\b', 'com as'),
    (r'\bpor el\b', 'pelo'),
    (r'\bpor la\b', 'pela'),
    (r'\bpor los\b', 'pelos'),
    (r'\bpor las\b', 'pelas'),
    (r'\bbajo\b', 'sob'),
    (r'\bsobre\b', 'sobre'),
    (r'\b(?<![a-zA-Záéíóú])el(?![a-zA-Záéíóú])\b', 'o'),
    (r'\b(?<![a-zA-Záéíóú])la(?![a-zA-Záéíóú])\b', 'a'),
    (r'\blos\b', 'os'),
    (r'\blas\b', 'as'),
    (r'\bun\b', 'um'),
    (r'\buna\b', 'uma'),
    (r'\bunos\b', 'uns'),
    (r'\bunas\b', 'umas'),
    (r'\by\b', 'e'),
    (r'\bes\b', 'é'),
    (r'\bson\b', 'são'),
    (r'\bcon\b', 'com'),
    (r'\bsu\b', 'o seu'),
    (r'\bsus\b', 'os seus'),
]

# ── Post-processing pass (false friends, gender, contractions) ───────────────
POST_FIXES = [
    # acceso family
    (r'\bacceso\b', 'acesso'),
    (r'\baccesos\b', 'acessos'),
    (r'\bacceder\b', 'aceder'),
    (r'\baccesible\b', 'acessível'),
    (r'\baccesibles\b', 'acessíveis'),
    # ción → ção
    (r'\binformación\b', 'informação'),
    (r'\bdirección\b', 'direção'),
    (r'\bsituación\b', 'situação'),
    (r'\borganización\b', 'organização'),
    (r'\bvacunación\b', 'vacinação'),
    (r'\binclusión\b', 'inclusão'),
    (r'\bocasión\b', 'ocasião'),
    (r'\bconcesión\b', 'concessão'),
    (r'\bobligación\b', 'obrigação'),
    (r'\baprobación\b', 'aprovação'),
    (r'\bcomunicación\b', 'comunicação'),
    (r'\bidentificación\b', 'identificação'),
    (r'\bdocumentación\b', 'documentação'),
    (r'\bproducción\b', 'produção'),
    (r'\bcreación\b', 'criação'),
    (r'\bcombinación\b', 'combinação'),
    (r'\binstalación\b', 'instalação'),
    (r'\binspiración\b', 'inspiração'),
    (r'\bselección\b', 'seleção'),
    (r'\bcondición\b', 'condição'),
    (r'\bcondiciones\b', 'condições'),
    (r'\bdescripción\b', 'descrição'),
    (r'\baceptación\b', 'aceitação'),
    (r'\binfracción\b', 'infração'),
    (r'\bvariación\b', 'variação'),
    (r'\bestación\b', 'estação'),
    (r'\bestaciones\b', 'estações'),
    # Common nouns
    (r'\bpuerto\b', 'porto'),
    (r'\bpuertos\b', 'portos'),
    (r'\bmilenio\b', 'milénio'),
    (r'\bestudiantil\b', 'estudantil'),
    (r'\benergía\b', 'energia'),
    (r'\bjoven\b', 'jovem'),
    (r'\bjóvenes\b', 'jovens'),
    (r'\binnovación\b', 'inovação'),
    (r'\bicono\b', 'ícone'),
    (r'\biconos\b', 'ícones'),
    (r'\barquitectónico\b', 'arquitetónico'),
    (r'\barquitectónica\b', 'arquitetónica'),
    (r'\barquitectura\b', 'arquitetura'),
    (r'\bcontemporáneo\b', 'contemporâneo'),
    (r'\bcontemporánea\b', 'contemporânea'),
    (r'\bdescubrimiento\b', 'descoberta'),
    (r'\bexcepcional\b', 'excecional'),
    (r'\bincluyendo\b', 'incluindo'),
    (r'\boficial\b', 'oficial'),
    (r'\boficiales\b', 'oficiais'),
    (r'\binglés\b', 'inglês'),
    (r'\bfrancés\b', 'francês'),
    (r'\balemán\b', 'alemão'),
    (r'\bespañol\b', 'espanhol'),
    (r'\bportugués\b', 'português'),
    # Verbs
    (r'\bfue\b', 'foi'),
    (r'\bfueron\b', 'foram'),
    (r'\bson\b', 'são'),
    (r'\bestán\b', 'estão'),
    (r'\bhubo\b', 'houve'),
    (r'\bhabía\b', 'havia'),
    (r'\bhabían\b', 'haviam'),
    (r'\bse ha\b', 'foi'),
    (r'\bha sido\b', 'foi'),
    (r'\bse encuentra\b', 'encontra-se'),
    (r'\bse encuentran\b', 'encontram-se'),
    (r'\bse extiende\b', 'estende-se'),
    (r'\bse extienden\b', 'estendem-se'),
    (r'\bcomplementan\b', 'complementam'),
    # Trela family + gender
    (r'\bcorrea\b', 'trela'),
    (r'\btamaño\b', 'tamanho'),
    (r'\btamaños\b', 'tamanhos'),
    (r'\bobligatoria\b', 'obrigatória'),
    (r'\bobligatorio\b', 'obrigatório'),
    (r'\bobligatorios\b', 'obrigatórios'),
    (r'\bobligatorias\b', 'obrigatórias'),
    (r'\bpasaporte\b', 'passaporte'),
    (r'\bpasaportes\b', 'passaportes'),
    (r'\beuropeo\b', 'europeu'),
    (r'\beuropea\b', 'europeia'),
    (r'\beuropeos\b', 'europeus'),
    (r'\beuropeas\b', 'europeias'),
    (r'\btratamiento\b', 'tratamento'),
    (r'\btratamientos\b', 'tratamentos'),
    (r'\bcompañía\b', 'companhia'),
    (r'\bley\b', 'lei'),
    (r'\bleyes\b', 'leis'),
    (r'\bisla\b', 'ilha'),
    (r'\bislas\b', 'ilhas'),
    (r'\batlántico\b', 'atlântico'),
    (r'\batlántica\b', 'atlântica'),
    (r'\bmediterráneo\b', 'mediterrâneo'),
    (r'\bmediterránea\b', 'mediterrânea'),
    (r'\bantiguo\b', 'antigo'),
    (r'\bantigua\b', 'antiga'),
    (r'\bdinamarquesa\b', 'dinamarquesa'),
    # Months
    (r'\boctubre\b', 'outubro'),
    (r'\bmayo\b', 'maio'),
    (r'\bjunio\b', 'junho'),
    (r'\bjulio\b', 'julho'),
    (r'\bseptiembre\b', 'setembro'),
    (r'\bnoviembre\b', 'novembro'),
    (r'\bdiciembre\b', 'dezembro'),
    (r'\bfebrero\b', 'fevereiro'),
    (r'\benero\b', 'janeiro'),
    (r'\babril\b', 'abril'),
    (r'\bmarzo\b', 'março'),
    (r'\bagosto\b', 'agosto'),
    # Cleanup contractions
    (r'\bem o\b', 'no'),
    (r'\bem a\b', 'na'),
    (r'\bem os\b', 'nos'),
    (r'\bem as\b', 'nas'),
    (r'\bde os\b', 'dos'),
    (r'\bde as\b', 'das'),
    (r'\bde o\b', 'do'),
    (r'\bde a\b', 'da'),
    (r'\ba o\b', 'ao'),
    (r'\ba os\b', 'aos'),
    # ── Round 2 (added 2026-05-18 to fix GSC duplicate flags) ────────────
    # Pure ES → PT verb conjugations that were leaking
    (r'\bdespués de\b', 'depois de'),
    (r'\bdespués del\b', 'depois do'),
    (r'\bdespués\b', 'depois'),
    (r'\bmientras tanto\b', 'entretanto'),
    (r'\bmientras\b', 'enquanto'),
    (r'\bhicieron\b', 'fizeram'),
    (r'\bhizo\b', 'fez'),
    (r'\bhacen\b', 'fazem'),
    (r'\bhace\b', 'faz'),
    (r'\bhacer\b', 'fazer'),
    (r'\bhacia\b', 'para'),
    (r'\bincluyen\b', 'incluem'),
    (r'\bincluye\b', 'inclui'),
    (r'\badmiten\b', 'admitem'),
    (r'\bencuentran\b', 'encontram'),
    (r'\bencuentra\b', 'encontra'),
    (r'\bencuentro\b', 'encontro'),
    (r'\bvienen\b', 'vêm'),
    (r'\bviene\b', 'vem'),
    (r'\bvino\b', 'veio'),
    (r'\bvienieron\b', 'vieram'),
    (r'\bvinieron\b', 'vieram'),
    (r'\bllegan\b', 'chegam'),
    (r'\bllega\b', 'chega'),
    (r'\bllegó\b', 'chegou'),
    (r'\bllegaron\b', 'chegaram'),
    (r'\bllevan\b', 'levam'),
    (r'\blleva\b', 'leva'),
    (r'\bllevó\b', 'levou'),
    (r'\bllevaron\b', 'levaram'),
    (r'\bcaminan\b', 'caminham'),
    (r'\bcamina\b', 'caminha'),
    (r'\bpasan\b', 'passam'),
    (r'\bpasa\b', 'passa'),
    (r'\bpasó\b', 'passou'),
    (r'\bpasaron\b', 'passaram'),
    (r'\bcogen\b', 'apanham'),
    (r'\bcoge\b', 'apanha'),
    (r'\bcogió\b', 'apanhou'),
    (r'\bsuele\b', 'costuma'),
    # Adverbs of place leaking
    (r'\bencima de\b', 'em cima de'),
    (r'\bencima\b', 'em cima'),
    (r'\bdebajo de\b', 'debaixo de'),
    (r'\bdebajo\b', 'debaixo'),
    (r'\barriba\b', 'em cima'),
    (r'\babajo\b', 'em baixo'),
    (r'\bfuera de\b', 'fora de'),
    (r'\bfuera\b', 'fora'),
    (r'\baún\b', 'ainda'),
    # Numbers (when written out)
    (r'\bdos\b', 'dois'),
    (r'\btres\b', 'três'),
    (r'\bcuatro\b', 'quatro'),
    (r'\bseis\b', 'seis'),
    (r'\bsiete\b', 'sete'),
    (r'\bocho\b', 'oito'),
    (r'\bnueve\b', 'nove'),
    (r'\bdiez\b', 'dez'),
    # Time / words
    (r'\btiempos\b', 'tempos'),
    (r'\btiempo\b', 'tempo'),
    (r'\bveces\b', 'vezes'),
    (r'\bhorarios\b', 'horários'),
    (r'\bhorario\b', 'horário'),
    # "Pueblo" → "aldeia" (Iberian villages; less ambiguous than "vila")
    (r'\bpueblos\b', 'aldeias'),
    (r'\bpueblo\b', 'aldeia'),
    # "si" (if) → "se" (only when standalone, not "sí" which is "yes")
    (r'\bsi\b', 'se'),
    # ES-only contractions still leaking
    (r'\bvolverá\b', 'voltará'),
    (r'\bvolver\b', 'voltar'),
    (r'\bjueves\b', 'quinta-feira'),
    (r'\bviernes\b', 'sexta-feira'),
    (r'\blunes\b', 'segunda-feira'),
    (r'\bmartes\b', 'terça-feira'),
    (r'\bmiércoles\b', 'quarta-feira'),
    # Gender fixes
    (r'\bos paredes\b', 'as paredes'),
    (r'\bos ruelas\b', 'as ruelas'),
    (r'\bos cidades\b', 'as cidades'),
    (r'\bos praias\b', 'as praias'),
    (r'\bos torres\b', 'as torres'),
    (r'\bos pontes\b', 'as pontes'),
    (r'\bdois clínicas\b', 'duas clínicas'),
    (r'\bdois cidades\b', 'duas cidades'),
    (r'\bdois praias\b', 'duas praias'),
    (r'\bdois zonas\b', 'duas zonas'),
    # Punctuation
    (r'¿', ''),
    (r'¡', ''),
    # Funcionan, etc.
    (r'\bfuncionan\b', 'funcionam'),
    (r'\bFinlandia\b', 'Finlândia'),
    (r'\bequinococosis\b', 'equinococose'),
    # ñ → nh
    (r'ñ', 'nh'),
]


def translate(text):
    """Apply translation pipeline to a string."""
    if not isinstance(text, str):
        return text
    result = text
    for pattern, repl in REPLACEMENTS + POST_FIXES:
        if callable(repl):
            result = re.sub(pattern, repl, result, flags=re.IGNORECASE)
        else:
            def smart_replace(m, r=repl):
                orig = m.group(0)
                if orig and orig[0].isupper() and r:
                    return r[0].upper() + r[1:]
                return r
            result = re.sub(pattern, smart_replace, result, flags=re.IGNORECASE)
    return result


def add_pt_to_obj(obj, force=False):
    """Walk obj, for every *Es field, add *Pt counterpart with translated value.

    Idempotent by default (only adds when *Pt is absent).
    If force=True, overwrites existing *Pt with a fresh translation from *Es,
    which is the right mode when you've improved the dictionary and want
    to re-translate the whole corpus.
    """
    if isinstance(obj, dict):
        new_keys = {}
        for k, v in obj.items():
            if k.endswith('Es'):
                pt_key = k[:-2] + 'Pt'
                if force or pt_key not in obj:
                    if isinstance(v, str):
                        new_keys[pt_key] = translate(v)
                    elif isinstance(v, list):
                        translated = []
                        for item in v:
                            if isinstance(item, str):
                                translated.append(translate(item))
                            elif isinstance(item, dict):
                                translated.append({ik: translate(iv) if isinstance(iv, str) else iv for ik, iv in item.items()})
                            else:
                                translated.append(item)
                        new_keys[pt_key] = translated
                    else:
                        new_keys[pt_key] = v
            if isinstance(v, (dict, list)):
                add_pt_to_obj(v, force=force)
        for nk, nv in new_keys.items():
            obj[nk] = nv
    elif isinstance(obj, list):
        for item in obj:
            add_pt_to_obj(item, force=force)


def restore_digits(obj):
    """For every Es/Pt sibling pair, restore mangled first digits from ES."""
    def fix(pt, es):
        if not pt or not es:
            return pt
        pn = list(re.finditer(r'\d+', pt))
        en = list(re.finditer(r'\d+', es))
        if len(pn) != len(en):
            return pt
        result = pt
        offset = 0
        for p, e in zip(pn, en):
            ps, es_v = p.group(0), e.group(0)
            if len(ps) == len(es_v) and ps[0] == '1' and es_v[0] != '1' and ps[1:] == es_v[1:]:
                start = p.start() + offset
                end = p.end() + offset
                result = result[:start] + es_v + result[end:]
                offset += len(es_v) - len(ps)
        return result

    if isinstance(obj, dict):
        for k, v in list(obj.items()):
            if k.endswith('Es'):
                pt_key = k[:-2] + 'Pt'
                if pt_key in obj:
                    if isinstance(v, str) and isinstance(obj[pt_key], str):
                        obj[pt_key] = fix(obj[pt_key], v)
                    elif isinstance(v, list) and isinstance(obj[pt_key], list) and len(v) == len(obj[pt_key]):
                        for i, (ev, pv) in enumerate(zip(v, obj[pt_key])):
                            if isinstance(ev, str) and isinstance(pv, str):
                                obj[pt_key][i] = fix(pv, ev)
                            elif isinstance(ev, dict) and isinstance(pv, dict):
                                for ik in ev:
                                    if isinstance(ev[ik], str) and isinstance(pv.get(ik), str):
                                        pv[ik] = fix(pv[ik], ev[ik])
            if isinstance(v, (dict, list)):
                restore_digits(v)
    elif isinstance(obj, list):
        for x in obj:
            restore_digits(x)


def count_pt(obj, counter=None):
    if counter is None:
        counter = [0]
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k.endswith('Pt'):
                counter[0] += 1
            count_pt(v, counter)
    elif isinstance(obj, list):
        for x in obj:
            count_pt(x, counter)
    return counter[0]


def process_file(fp, force=False):
    """Returns tuple (slug, before_pt, after_pt, changed_bool)."""
    slug = Path(fp).stem
    try:
        data = json.load(open(fp, encoding='utf-8'))
    except Exception as e:
        return (slug, 0, 0, False, str(e))
    before_count = count_pt(data)
    before_blob = json.dumps(data, ensure_ascii=False)
    add_pt_to_obj(data, force=force)
    restore_digits(data)
    after_blob = json.dumps(data, ensure_ascii=False)
    after_count = count_pt(data)
    changed = before_blob != after_blob
    if changed:
        json.dump(data, open(fp, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
    return (slug, before_count, after_count, changed, None)


def main():
    args = sys.argv[1:]
    force = False
    if '--force' in args:
        force = True
        args = [a for a in args if a != '--force']
    if args:
        files = [str(ROOT / f'data/city-guides/{a}.json') for a in args]
    else:
        files = sorted(glob.glob(str(ROOT / 'data/city-guides/*.json')))

    total_added = 0
    files_changed = 0
    for fp in files:
        if '_evidence' in fp:
            continue
        if not Path(fp).exists():
            print(f"  SKIP missing: {fp}")
            continue
        slug, before, after, changed, err = process_file(fp, force=force)
        if err:
            print(f"  ERROR {slug}: {err}")
            continue
        delta = after - before
        if changed:
            files_changed += 1
            total_added += delta
            print(f"  {slug}: +{delta} Pt fields ({before} → {after})")

    print(f"\n✅ Translated {files_changed} file(s), {total_added} new Pt fields total")


if __name__ == '__main__':
    main()
