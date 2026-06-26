// ============================================================
// DEFINICIONS DE LES PARAULES
// ============================================================
// Definició breu de cada paraula, per al comodí 🔍 (click-and-hold).
// Es busca per la paraula tal com surt a la carta. Les famílies
// d'amics (bromes internes) no tenen definició; la NBA catalana
// mostra el nom de l'equip real en anglès.
// ============================================================

const DEFINICIONS = {
  // --- Fruites ---
  "Poma": "Fruita del pomer", "Pera": "Fruita de la perera", "Plàtan": "Fruita allargada groga",
  "Raïm": "Fruit de la vinya", "Síndria": "Fruita d'estiu, vermella per dins", "Meló": "Fruita d'estiu dolça",
  "Cirera": "Fruita petita vermella amb pinyol", "Préssec": "Fruita de pell vellutada", "Maduixa": "Fruita vermella petita",
  "Taronja": "Cítric ataronjat",
  // --- Animals ---
  "Fagina": "Mamífer carnívor àgil, com una marta", "Toixó": "Mamífer cavador (teixó)", "Geneta": "Mamífer tacat nocturn",
  "Mussol": "Ocell rapinyaire nocturn", "Talp": "Mamífer que viu sota terra", "Eriçó": "Mamífer cobert de pues",
  "Fura": "Mamífer allargat domesticable", "Isard": "Cabra salvatge del Pirineu", "Cabirol": "Cérvol petit",
  "Senglar": "Porc salvatge",
  // --- Colors (difícils) ---
  "Atzur": "Blau cel intens", "Carmesí": "Vermell intens", "Ocre": "Groc terrós", "Magenta": "Rosa porpra viu",
  "Turquesa": "Blau verdós", "Beix": "Marró clar", "Granat": "Vermell fosc", "Malva": "Lila pàl·lid",
  "Sèpia": "Marró grisós", "Maragda": "Verd intens",
  // --- Oficis ---
  "Boter": "Fa bótes de fusta", "Calafat": "Impermeabilitza vaixells", "Terrissaire": "Fa atuells de fang",
  "Vidrier": "Treballa el vidre", "Cisteller": "Fa cistells", "Esmolet": "Esmola ganivets i eines",
  "Matalasser": "Fa i arregla matalassos", "Pellaire": "Treballa les pells", "Courer": "Treballa el coure",
  "Llauner": "Treballa la llauna; lampista",
  // --- Esports ---
  "Curling": "Esport de gel amb pedres", "Biatló": "Esquí de fons i tir", "Esgrima": "Combat amb espasa",
  "Halterofília": "Aixecament de pesos", "Waterpolo": "Esport de pilota a l'aigua", "Bàdminton": "Raqueta i volant",
  "Petanca": "Boles a terra", "Croquet": "Boles i maces sobre gespa", "Pentatló": "Cinc proves combinades",
  "Espeleologia": "Exploració de coves",
  // --- Mobles ---
  "Escambell": "Tamboret baix", "Tocador": "Moble amb mirall per pentinar-se", "Paraigüer": "Suport per a paraigües",
  "Vitrina": "Armari amb vidres", "Bagul": "Caixa gran per guardar", "Arca": "Caixa antiga de fusta",
  "Penjador": "Per penjar la roba", "Capçal": "Capçalera del llit", "Llibreria": "Prestatgeria per a llibres",
  // --- Vehicles ---
  "Tartana": "Carro cobert de dues rodes", "Carrossa": "Cotxe luxós tirat per cavalls", "Funicular": "Tren per pendents amb cable",
  "Telefèric": "Cabina penjada d'un cable", "Troleibús": "Autobús elèctric amb perxes", "Gòndola": "Barca veneciana",
  "Zepelí": "Dirigible", "Catamarà": "Vaixell de dos cascos", "Quad": "Moto de quatre rodes", "Trineu": "Vehicle per lliscar sobre neu",
  // --- Instruments ---
  "Tenora": "Instrument de vent de la cobla", "Tible": "Instrument de vent de la cobla", "Flabiol": "Flauta petita de la cobla",
  "Sac de gemecs": "Cornamusa catalana", "Viola de roda": "Instrument de corda amb maneta", "Llaüt": "Corda pinçada antic",
  "Clavicèmbal": "Teclat de corda pinçada", "Ocarina": "Flauta ovalada de fang", "Tamborí": "Tambor petit",
  "Gralla": "Instrument de vent estrident",
  // --- Verdures ---
  "Xirivia": "Arrel blanca semblant a la pastanaga", "Colinap": "Nap-col", "Bleda": "Verdura de fulla verda",
  "Escarola": "Enciam arrissat amarg", "Nap": "Arrel comestible blanca", "Rave": "Arrel petita picant",
  "Fonoll": "Planta aromàtica anisada", "Carxofa": "Flor comestible", "Bròquil": "Col verda en floretes", "Api": "Tija verda crocant",
  // --- Roba ---
  "Armilla": "Peça sense mànigues", "Enagos": "Faldilla interior", "Polaines": "Cobreixen la cama baixa",
  "Gec": "Jaqueta", "Brusa": "Camisa femenina", "Calçotets": "Roba interior masculina", "Davantal": "Per protegir la roba cuinant",
  "Capell": "Barret", "Xal": "Mocador gran d'espatlles", "Faixa": "Cinta ampla per la cintura",
  // --- Parts del cos ---
  "Clatell": "Part posterior del coll", "Aixella": "Sota el braç", "Engonal": "Plec entre cama i tronc",
  "Turmell": "Articulació del peu", "Canell": "Articulació de la mà", "Empenya": "Part superior del peu",
  "Panxell": "Tou de la cama", "Nineta": "Pupil·la de l'ull", "Geniva": "Carn que envolta les dents",
  "Campaneta": "Úvula del paladar",
  // --- Ossos ---
  "Fèmur": "Os de la cuixa", "Húmer": "Os del braç", "Estèrnum": "Os central del pit", "Clavícula": "Os de l'espatlla",
  "Ròtula": "Os del genoll", "Peroné": "Os prim de la cama", "Omòplat": "Os pla de l'espatlla", "Vèrtebra": "Os de la columna",
  "Costella": "Os de la caixa toràcica", "Mandíbula": "Os de la barbeta",
  // --- Músculs ---
  "Bíceps": "Múscul del braç", "Tríceps": "Múscul posterior del braç", "Quàdriceps": "Múscul de la cuixa",
  "Bessons": "Músculs del panxell", "Deltoide": "Múscul de l'espatlla", "Trapezi": "Múscul de l'esquena alta",
  "Dorsal": "Múscul ample de l'esquena", "Pectoral": "Múscul del pit", "Lumbar": "Múscul de la part baixa de l'esquena",
  "Masseter": "Múscul de mastegar",
  // --- Meteorologia ---
  "Calabruix": "Calamarsa petita", "Torb": "Vent fred amb neu", "Xàfec": "Pluja forta i breu", "Gebre": "Gel fi sobre superfícies",
  "Boirina": "Boira lleugera", "Marinada": "Vent suau del mar", "Garbí": "Vent del sud-oest", "Tramuntana": "Vent fort del nord",
  "Llevantada": "Temporal de llevant", "Ruixat": "Pluja sobtada",
  // --- Cuina (estris) ---
  "Morter": "Per picar aliments", "Setrill": "Recipient per a l'oli", "Escorredora": "Per escórrer la pasta",
  "Espàtula": "Pala plana de cuina", "Cassó": "Cassola petita amb mànec", "Tupí": "Olla petita de terrissa",
  "Greixonera": "Cassola de fang", "Embut": "Con per abocar líquids", "Batedor": "Per batre i muntar",
  // --- Arbres ---
  "Lledoner": "Arbre de lledons", "Servera": "Arbre de serves", "Moixera": "Arbre de muntanya", "Tamariu": "Arbust de zones salines",
  "Alber": "Pollancre blanc", "Om": "Arbre de fulla dentada", "Freixe": "Arbre de fusta resistent", "Teix": "Conífera longeva i tòxica",
  "Boix": "Arbust de fusta dura", "Arboç": "Arbust de fruits vermells",
  // --- Begudes ---
  "Ratafia": "Licor d'herbes i nous", "Vermut": "Vi aromatitzat aperitiu", "Most": "Suc de raïm sense fermentar",
  "Mistela": "Vi dolç licorós", "Aiguardent": "Licor fort destil·lat", "Moscatell": "Vi dolç de moscat",
  "Sidra": "Beguda de poma fermentada", "Cigaló": "Cafè amb licor", "Orxata": "Beguda de xufa", "Granissat": "Beguda de gel raspat",
  // --- Festes catalanes ---
  "Sant Jordi": "Diada del llibre i la rosa (23 abril)", "Carnaval": "Festa de disfresses", "Castanyada": "Festa de castanyes (tardor)",
  "Reis": "Reis Mags (6 gener); o Sacramento Kings (NBA)", "Pasqua": "Festa de la mona", "La Mercè": "Festa major de Barcelona",
  "Tió": "Tronc que caga regals per Nadal", "Calçotada": "Àpat de calçots", "La Patum": "Festa de Berga", "Sant Medir": "Festa de Gràcia amb caramels",
  // --- Accent diacrític (s'escriuen sense accent) ---
  "Be": "Lletra B; o xai", "Deu": "El número 10; o font d'aigua", "Es": "Pronom 'es'; o lletra S", "Ma": "La meva (ma mare)",
  "Mes": "Període de 30 dies", "Mon": "El meu (mon pare)", "Pel": "Pèl; o per+el", "Que": "Conjunció/pronom 'que'",
  "Se": "Pronom 'se'", "Si": "Condició; o nota musical", "Sol": "Astre; o nota musical; o sol", "Te": "Pronom 'te'; o infusió",
  "Ossos": "Ossos del cos; o óssos (animals)", "Adeu": "Comiat (adéu)",
  // --- Mà ---
  "Polze": "Dit gros de la mà", "Índex": "Dit que assenyala", "Dit del mig": "Dit central", "Anular": "Dit de l'anell",
  "Menovell": "Dit petit", "Anell": "Joia que es porta al dit",
  // --- Segones residències (pobles) ---
  "St. Pere de Torelló": "Poble d'Osona", "Regencós": "Poble del Baix Empordà", "St. Esteve d'en Bas": "Poble de la Garrotxa",
  "Caldetes": "Caldes d'Estrac (Maresme)", "Son": "Poble de l'Alt Àneu (Pallars)", "Antist": "Poble del Pallars Jussà",
  // --- Capitals de comarca ---
  "Falset": "Capital del Priorat", "Gandesa": "Capital de la Terra Alta", "El Vendrell": "Capital del Baix Penedès",
  "Moià": "Capital del Moianès", "Amposta": "Capital del Montsià", "Banyoles": "Capital del Pla de l'Estany",
  "Solsona": "Capital del Solsonès", "Puigcerdà": "Capital de la Cerdanya", "Tremp": "Capital del Pallars Jussà",
  "Mollerussa": "Capital del Pla d'Urgell",
  // --- NBA catalana (nom real de l'equip en anglès) ---
  "Màgia": "Orlando Magic", "San Antoni": "San Antonio Spurs", "Guerrers": "Golden State Warriors",
  "Nàggets": "Denver Nuggets", "Cèrvols": "Milwaukee Bucks", "Àligues": "Atlanta Hawks", "Pistons": "Detroit Pistons",
  "Llamps": "Oklahoma City Thunder", // "Reis" (Sacramento Kings) ja té entrada combinada a Festes
  // (l'equip "Ossos" = Memphis Grizzlies; la paraula "Ossos" ja té entrada de diacrítics)
  // --- La granja ---
  "Vaca": "Animal de la llet", "Ovella": "Animal de la llana", "Porc": "Animal del corral, dona el porc",
  "Cavall": "Animal de muntar; o peça d'escacs (salta en L)",
  "Gallina": "Au que pon ous", "Conill": "Mamífer d'orelles llargues", "Ase": "Ruc", "Cabra": "Animal de muntanya domèstic",
  // --- Colors bàsics ---
  "Vermell": "Color de la sang", "Blau": "Color del cel", "Verd": "Color de l'herba", "Groc": "Color del sol",
  "Rosa": "Color rosat", "Negre": "Color fosc", "Blanc": "Color clar", "Lila": "Color violeta clar",
  // --- Transports ---
  "Cotxe": "Vehicle de quatre rodes", "Moto": "Vehicle de dues rodes", "Tren": "Va sobre rails", "Avió": "Vola pel cel",
  "Vaixell": "Navega per l'aigua", "Bicicleta": "De dues rodes a pedals", "Autobús": "Transport públic per carretera", "Camió": "Transporta càrrega",
  // --- L'escola ---
  "Llapis": "Per escriure i esborrar", "Goma": "Per esborrar", "Llibreta": "Per escriure-hi", "Motxilla": "Per portar el material",
  "Pissarra": "Superfície per escriure-hi a classe", "Estoig": "Per guardar llapis", "Regle": "Per fer ratlles rectes", "Tisores": "Per tallar",
  // --- L'esmorzar ---
  "Pa": "Aliment de farina", "Croissant": "Brioixeria de mitja lluna", "Galetes": "Dolç petit i cruixent", "Mantega": "Greix de la llet",
  "Melmelada": "Confitura de fruita", "Cereals": "Per esmorzar amb llet", "Iogurt": "Llet fermentada", "Mel": "Dolç de les abelles",
  // --- Dies de la setmana ---
  "Dilluns": "Primer dia laborable", "Dimarts": "Segon dia de la setmana", "Dimecres": "Tercer dia", "Dijous": "Quart dia",
  "Divendres": "Cinquè dia", "Dissabte": "Cap de setmana", "Diumenge": "Dia de festa",
  // --- Postres ---
  "Flam": "Postre d'ou i llet", "Gelat": "Postre gelat", "Pastís": "Dolç de forn", "Crema catalana": "Crema amb sucre cremat",
  "Coca": "Pasta dolça plana", "Torró": "Dolç d'ametlla nadalenc", "Tiramisú": "Postre italià de cafè i mascarpone", "Xocolata": "Dolç de cacau",
  // --- Escacs ---
  "Rei": "Peça principal dels escacs", "Dama": "Peça més poderosa", "Torre": "Peça que va en línia recta", "Alfil": "Peça que va en diagonal",
  "Peó": "Peça més petita", // "Cavall" ja té entrada combinada (granja + escacs)
  // --- Joies ---
  "Corona": "Joia del cap d'un rei", "Diamant": "Pedra preciosa brillant", "Collaret": "Joia del coll", "Arracada": "Joia de l'orella",
  "Polsera": "Joia del canell",
  // --- Països ---
  "Itàlia": "País amb forma de bota", "França": "País veí del nord", "Espanya": "País de la península Ibèrica",
  "Portugal": "País de l'oest ibèric", "Noruega": "País nòrdic dels fiords", "Japó": "País insular asiàtic",
  // --- Senyals de trànsit ---
  "Stop": "Atura't obligatòriament", "Cediu": "Cediu el pas", "Prohibit": "Acció no permesa", "Perill": "Avís de risc",
  "Rotonda": "Plaça circular de trànsit", "Vianants": "Pas de persones a peu",
  // --- Eines ---
  "Tenalles": "Per estrènyer o arrencar claus", "Filaberquí": "Trepant manual", "Escarpra": "Cisell per a pedra",
  "Garlopa": "Plana grossa de fuster", "Ribot": "Plana de fuster", "Enformador": "Cisell de fuster", "Trepant": "Per fer forats",
  "Mall": "Martell gran", "Punxó": "Per fer forats fins", "Aixol": "Destral de fuster",
  // --- Ocells ---
  "Òliba": "Rapinyaire nocturn de cara blanca", "Xoriguer": "Falcó petit", "Aufrany": "Voltor petit", "Bitó": "Au dels aiguamolls",
  "Cucut": "Ocell que pon a nius aliens", "Puput": "Ocell amb cresta", "Gaig": "Ocell del bosc cridaner", "Mallerenga": "Ocell petit i àgil",
  "Tudó": "Colom salvatge gros", "Pinsà": "Ocell cantaire petit",
  // --- Peixos ---
  "Lluç": "Peix blanc molt consumit", "Rèmol": "Peix pla", "Congre": "Peix allargat com una anguila", "Sorell": "Peix blau petit",
  "Llissa": "Peix de zones costaneres", "Moll": "Peix vermellós de roca", "Espet": "Peix allargat dentat", "Gall": "Peix pla apreciat",
  "Maire": "Peix petit de la família del lluç", "Bonítol": "Peix blau semblant a la tonyina",
  // --- Flors ---
  "Petúnia": "Flor de jardí acampanada", "Dàlia": "Flor vistosa de tardor", "Begònia": "Planta de flor i fulla decorativa",
  "Crisantem": "Flor de tardor", "Gerani": "Planta de balcó", "Azalea": "Arbust de flors vistoses", "Camèlia": "Flor d'hivern elegant",
  "Glicina": "Enfiladissa de flors liles", "Hortènsia": "Flor en pom rodó", "Lavanda": "Planta aromàtica lila",
  // --- Insectes ---
  "Libèl·lula": "Insecte volador d'ales llargues", "Pregadéu": "Insecte amb potes de pregària", "Tisoreta": "Insecte amb pinces al darrere",
  "Saltamartí": "Insecte saltador", "Efímera": "Insecte de vida molt curta", "Tàvec": "Mosca grossa que pica", "Borinot": "Abellot pelut",
  "Cigala": "Insecte que canta a l'estiu", "Panerola": "Escarabat de cuina", "Cuca de llum": "Insecte que brilla a la nit",
  // --- Minerals ---
  "Quars": "Mineral cristal·lí comú", "Pirita": "Mineral daurat (or dels ximples)", "Galena": "Mineral de plom",
  "Malaquita": "Mineral verd", "Ònix": "Pedra negra estriada", "Topazi": "Pedra preciosa groguenca", "Calcita": "Mineral de carbonat",
  "Mica": "Mineral en làmines", "Gneis": "Roca metamòrfica", "Basalt": "Roca volcànica fosca",
  // --- Espècies ---
  "Comí": "Espècia de llavor aromàtica", "Cúrcuma": "Espècia groga", "Nou moscada": "Espècia ratllada", "Anís": "Espècia de regust dolç",
  "Safrà": "Espècia vermella molt cara", "Llorer": "Fulla aromàtica per guisats", "Coriandre": "Herba i llavor aromàtica",
  "Pebre": "Espècia picant negra", "Clau": "Espècia en forma de claueta", "Gingebre": "Arrel picant aromàtica",
  // --- Teixits ---
  "Lli": "Teixit vegetal fresc", "Vellut": "Teixit suau i pelut", "Pana": "Teixit de canals", "Dril": "Teixit fort (texans)",
  "Tul": "Teixit fi i transparent", "Cànem": "Fibra vegetal resistent", "Setí": "Teixit llis i brillant", "Llana": "Fibra de l'ovella",
  "Seda": "Teixit fi del cuc de seda", "Ras": "Teixit llis i lluent",
  // --- Clubs de futbol ---
  "Liverpool": "Club de futbol anglès", "Arsenal": "Club de futbol de Londres", "Chelsea": "Club de futbol de Londres",
  "Sevilla": "Club de futbol espanyol", "Nàpols": "Club de futbol italià", "Porto": "Club de futbol portuguès",
  "Ajax": "Club de futbol neerlandès", "Mònaco": "Club de futbol monegasc", "Leeds": "Club de futbol anglès", "Lió": "Club de futbol francès",
  // --- Seus olímpiques ---
  "Atenes": "JJOO 1896 i 2004 (Grècia)", "Hèlsinki": "JJOO 1952 (Finlàndia)", "Melbourne": "JJOO 1956 (Austràlia)",
  "Munic": "JJOO 1972 (Alemanya)", "Moscou": "JJOO 1980 (Rússia)", "Seül": "JJOO 1988 (Corea del Sud)",
  "Atlanta": "JJOO 1996 (EUA)", "Sydney": "JJOO 2000 (Austràlia)", "Torí": "JJOO d'hivern 2006 (Itàlia)", "Nagano": "JJOO d'hivern 1998 (Japó)",
  // --- Rius (coneguts) ---
  "Nil": "Riu d'Àfrica, el més llarg", "Amazones": "Riu cabalós de Sud-amèrica", "Danubi": "Gran riu d'Europa central",
  "Ter": "Riu de Girona", "Ebre": "Gran riu de Catalunya/Aragó", "Llobregat": "Riu de Barcelona", "Sena": "Riu de París",
  "Tàmesi": "Riu de Londres", "Roine": "Riu de França i Suïssa", "Segre": "Riu de Lleida",
  // --- Muntanyes (conegudes) ---
  "Everest": "Cim més alt del món", "Mont Blanc": "Cim més alt dels Alps", "Teide": "Volcà de Tenerife",
  "Kilimanjaro": "Cim més alt d'Àfrica", "Fuji": "Volcà símbol del Japó", "Etna": "Volcà de Sicília", "Montserrat": "Muntanya símbol de Catalunya",
  "Aneto": "Cim més alt dels Pirineus", "Canigó": "Muntanya de la Catalunya Nord", "Pedraforca": "Muntanya de doble cim",
  // --- Mars (coneguts) ---
  "Mediterrani": "Mar entre Europa i Àfrica", "Carib": "Mar tropical d'Amèrica", "Mar del Nord": "Mar del nord d'Europa",
  "Mar Negre": "Mar entre Europa i Àsia", "Mar Roig": "Mar entre Àfrica i Aràbia", "Bàltic": "Mar del nord d'Europa",
  "Mar Mort": "Llac salat molt baix", "Adriàtic": "Mar entre Itàlia i els Balcans", "Egeu": "Mar de Grècia", "Pacífic": "L'oceà més gran",
  // --- Llacs (coneguts) ---
  "Titicaca": "Llac alt entre Perú i Bolívia", "Garda": "Llac del nord d'Itàlia", "Como": "Llac dels Alps italians",
  "Victòria": "Gran llac d'Àfrica", "Bàikal": "Llac més profund del món", "Michigan": "Gran llac dels EUA",
  "Ginebra": "Llac de Suïssa", "Constança": "Llac entre Suïssa, Àustria i Alemanya", "Ness": "Llac escocès del monstre",
  // --- Rius (poc coneguts, catalans) ---
  "Fluvià": "Riu de l'Alt Empordà", "Besòs": "Riu del nord de Barcelona", "Tordera": "Riu entre Barcelona i Girona",
  "Gaià": "Riu de Tarragona", "Muga": "Riu de l'Alt Empordà", "Onyar": "Riu de Girona ciutat", "Sénia": "Riu del límit sud de Catalunya",
  "Brugent": "Afluent del Ter", "Daró": "Riu del Baix Empordà", "Ridaura": "Riu de la Costa Brava",
  // --- Muntanyes (poc conegudes, catalanes) ---
  "Puigmal": "Cim de la Cerdanya", "Matagalls": "Cim del Montseny", "Carlit": "Cim de la Cerdanya nord",
  "Bastiments": "Cim del Ripollès", "Tagamanent": "Muntanya del Vallès", "Montcau": "Cim de Sant Llorenç del Munt",
  "Costabona": "Cim del Ripollès", "Puigsacalm": "Cim de la Garrotxa", "Comabona": "Cim del Cadí", "Gallinàs": "Cim del Berguedà",
  // --- Mars (poc coneguts) ---
  "Tirrè": "Mar a l'oest d'Itàlia", "Jònic": "Mar al sud d'Itàlia i Grècia", "Lígur": "Mar del golf de Gènova",
  "Cèltic": "Mar a l'oest de les Illes Britàniques", "Cantàbric": "Mar del nord d'Espanya", "Aral": "Mar interior assecat (Àsia)",
  "Aràbic": "Mar entre Aràbia i l'Índia", "Andaman": "Mar del sud-est asiàtic", "Tasman": "Mar entre Austràlia i Nova Zelanda", "Banda": "Mar d'Indonèsia",
  // --- Llacs (poc coneguts) ---
  "Ladoga": "Llac de Rússia, el més gran d'Europa", "Erie": "Un dels Grans Llacs (EUA)", "Malawi": "Gran llac d'Àfrica",
  "Onega": "Llac del nord-oest de Rússia", "Tanganyika": "Llac llarg i profund d'Àfrica", "Balaton": "Llac d'Hongria",
  "Ohrid": "Llac dels Balcans", "Vänern": "Llac més gran de Suècia", "Maracaibo": "Llac de Veneçuela", "Eyre": "Llac salat d'Austràlia",
  // --- Músics (famosos) ---
  "Beethoven": "Compositor alemany", "Mozart": "Compositor austríac", "Bach": "Compositor barroc alemany", "Chopin": "Compositor polonès de piano",
  "Vivaldi": "Compositor barroc italià", "Verdi": "Compositor d'òpera italià", "Wagner": "Compositor d'òpera alemany",
  "Txaikovski": "Compositor rus", "Strauss": "Compositor de valsos austríac", "Haydn": "Compositor clàssic austríac",
  // --- Escriptors (famosos) ---
  "Shakespeare": "Dramaturg anglès", "Cervantes": "Autor del Quixot", "Dickens": "Novel·lista anglès", "Tolstoi": "Novel·lista rus",
  "Kafka": "Escriptor txec", "Orwell": "Autor de 1984", "Dante": "Poeta italià medieval", "Goethe": "Escriptor alemany",
  "Dostoievski": "Novel·lista rus", "Hemingway": "Novel·lista nord-americà",
  // --- Actors (famosos) ---
  "DiCaprio": "Actor de Hollywood (Titanic)", "Hanks": "Actor de Hollywood (Forrest Gump)", "Roberts": "Actriu (Pretty Woman)",
  "Pitt": "Actor de Hollywood", "Cruise": "Actor d'acció (Mission Impossible)", "Washington": "Actor (Denzel)",
  "Jolie": "Actriu de Hollywood", "Clooney": "Actor de Hollywood", "Damon": "Actor (Bourne)", "Lawrence": "Actriu (Jennifer)",
  // --- Científics (famosos) ---
  "Einstein": "Físic de la relativitat", "Newton": "Físic de la gravetat", "Darwin": "Pare de l'evolució", "Curie": "Pionera de la radioactivitat",
  "Tesla": "Inventor de l'electricitat", "Galileu": "Astrònom italià", "Edison": "Inventor de la bombeta", "Hawking": "Físic dels forats negres",
  "Pasteur": "Pioner de la microbiologia", "Arquimedes": "Savi grec antic",
  // --- Músics (de nínxol) ---
  "Telemann": "Compositor barroc alemany", "Scarlatti": "Compositor barroc italià", "Albinoni": "Compositor barroc italià",
  "Boccherini": "Compositor italià clàssic", "Saint-Saëns": "Compositor francès", "Bruckner": "Compositor austríac",
  "Janáček": "Compositor txec", "Smetana": "Compositor txec", "Granados": "Compositor català", "Albéniz": "Compositor català",
  // --- Escriptors (catalans) ---
  "Rodoreda": "Novel·lista catalana", "Verdaguer": "Poeta català (L'Atlàntida)", "Espriu": "Poeta català", "Sagarra": "Escriptor català",
  "Calders": "Escriptor català de contes", "Monzó": "Escriptor català actual", "Llull": "Filòsof medieval mallorquí",
  "Maragall": "Poeta català", "Oller": "Novel·lista català", "Foix": "Poeta català",
  // --- Actors (clàssics) ---
  "Brando": "Actor (El Padrí)", "Pacino": "Actor (El Padrí)", "Streep": "Actriu camaleònica", "Hepburn": "Actriu clàssica",
  "Hopkins": "Actor (El silenci dels anyells)", "Nicholson": "Actor (El resplendor)", "Olivier": "Actor britànic clàssic",
  "Bergman": "Actriu/cineasta", "Mastroianni": "Actor italià", "Depardieu": "Actor francès",
  // --- Científics (de nínxol) ---
  "Bohr": "Físic de l'àtom", "Faraday": "Pioner de l'electromagnetisme", "Planck": "Pare de la física quàntica",
  "Heisenberg": "Físic del principi d'incertesa", "Maxwell": "Físic de l'electromagnetisme", "Pauli": "Físic quàntic",
  "Schrödinger": "Físic del gat quàntic", "Rutherford": "Pare de la física nuclear", "Lavoisier": "Pare de la química", "Mendeleiev": "Creador de la taula periòdica",
  // --- Branques (matemàtiques) ---
  "Àlgebra": "Càlcul amb lletres i incògnites", "Càlcul": "Branca de límits i derivades", "Probabilitat": "Estudi de l'atzar",
  "Geometria": "Estudi de figures i espai", "Topologia": "Estudi de les formes contínues", "Estadística": "Estudi de dades",
  "Trigonometria": "Estudi dels triangles", "Aritmètica": "Operacions amb nombres", "Lògica": "Estudi del raonament", "Anàlisi": "Branca del càlcul avançat",
  // --- Operacions ---
  "Suma": "Operació d'afegir", "Resta": "Operació de treure", "Producte": "Resultat de multiplicar", "Divisió": "Operació de repartir",
  "Potència": "Multiplicar per si mateix", "Arrel": "Operació inversa de la potència", "Derivada": "Ritme de canvi d'una funció",
  "Integral": "Àrea sota una corba", "Factorial": "Producte de tots els nombres fins a un", "Mòdul": "Residu d'una divisió",
  // --- Objectes de mates ---
  "Calculadora": "Aparell per fer càlculs", "Ordinador": "Màquina de processar dades", "Àbac": "Calculadora de boletes",
  "Compàs": "Per dibuixar cercles", "Transportador": "Per mesurar angles", "Esquadra": "Regle triangular", "Cartabó": "Regle triangular (30-60)",
  "Regle": "Per fer línies rectes", "Escaire": "Regle en angle recte", "Plantilla": "Per dibuixar formes",
  // --- Matemàtics ---
  "Euler": "Matemàtic suís prolífic", "Gauss": "Matemàtic alemany genial", "Pitàgores": "Matemàtic grec del teorema",
  "Fermat": "Matemàtic del darrer teorema", "Hilbert": "Matemàtic alemany", "Riemann": "Matemàtic de la geometria",
  "Turing": "Pare de la informàtica", "Fibonacci": "Matemàtic de la successió", "Cantor": "Matemàtic dels infinits",
  // --- Elements químics ---
  "Hidrogen": "Element més lleuger (H)", "Heli": "Gas noble dels globus (He)", "Liti": "Metall de les bateries (Li)",
  "Carboni": "Element de la vida (C)", "Oxigen": "Gas que respirem (O)", "Sodi": "Metall de la sal (Na)", "Ferro": "Metall comú (Fe)",
  "Neó": "Gas noble dels llums (Ne)", "Argó": "Gas noble (Ar)", "Iode": "Element del betadine (I)",
  // --- Planetes i astres ---
  "Mercuri": "Planeta més proper al Sol", "Venus": "Planeta més calent", "Mart": "Planeta vermell", "Júpiter": "Planeta més gran",
  "Saturn": "Planeta dels anells", "Urà": "Planeta gelat inclinat", "Neptú": "Planeta blau llunyà", "Plutó": "Planeta nan",
  "Terra": "El nostre planeta", "Lluna": "Satèl·lit de la Terra",
  // --- Unitats ---
  "Joule": "Unitat d'energia", "Pascal": "Unitat de pressió", "Volt": "Unitat de tensió elèctrica", "Amper": "Unitat de corrent",
  "Hertz": "Unitat de freqüència", "Kelvin": "Unitat de temperatura", "Watt": "Unitat de potència", "Mol": "Unitat de quantitat de matèria",
  "Lux": "Unitat d'il·luminació", "Bar": "Unitat de pressió",
  // --- Comarques ---
  "Garrotxa": "Comarca volcànica (Olot)", "Empordà": "Comarca de la Costa Brava", "Priorat": "Comarca del vi (Tarragona)",
  "Anoia": "Comarca d'Igualada", "Segarra": "Comarca de Cervera", "Garraf": "Comarca de Sitges", "Maresme": "Comarca costanera (Mataró)",
  "Bages": "Comarca de Manresa", "Osona": "Comarca de Vic", "Conflent": "Comarca de la Catalunya Nord",
  // --- Símbols catalans ---
  "Senyera": "Bandera catalana", "Barretina": "Gorra vermella tradicional", "Caganer": "Figura del pessebre", "Sardana": "Dansa catalana en rotllana",
  "Castells": "Torres humanes", "Diada": "Festa nacional (11 setembre)", "Estaca": "Cançó de Lluís Llach", "Espardenya": "Calçat tradicional de espart",
  "Porró": "Recipient de vi amb broc", "Calçot": "Ceba tendra de calçotada",
  // --- Pobles amb encant ---
  "Begur": "Poble de la Costa Brava", "Cadaqués": "Poble del Cap de Creus", "Besalú": "Vila medieval amb pont", "Rupit": "Poble del Collsacabra",
  "Siurana": "Poble penjat al Priorat", "Peratallada": "Vila medieval empordanesa", "Mura": "Poble del Bages", "Cardona": "Vila amb castell i muntanya de sal",
  "Pals": "Poble medieval empordanès", "Beget": "Poble del Ripollès",
  // --- Pizzes ---
  "Margarita": "Pizza de tomàquet i mozzarella", "Diàvola": "Pizza picant amb salami", "Quatre formatges": "Pizza de quatre formatges",
  "Prosciutto": "Pizza amb pernil", "Napolitana": "Pizza clàssica de Nàpols", "Capricciosa": "Pizza amb pernil, xampinyons i carxofa",
  "Hawaiana": "Pizza amb pinya", "Calzone": "Pizza tancada com una empanada", "Marinara": "Pizza de tomàquet, all i orenga", "Pepperoni": "Pizza d'embotit picant",
  // --- Pastes ---
  "Espaguetis": "Pasta llarga i fina", "Macarrons": "Pasta curta tubular", "Lasanya": "Pasta en capes al forn", "Tallarines": "Pasta en cintes fines",
  "Raviolis": "Pasta farcida quadrada", "Penne": "Pasta tubular tallada en biaix", "Fusilli": "Pasta en espiral", "Canelons": "Pasta enrotllada i farcida",
  "Nyoquis": "Pasta de patata", "Tagliatelle": "Pasta en cintes amples",
  // --- Formatges ---
  "Brie": "Formatge francès cremós", "Gouda": "Formatge neerlandès", "Parmesà": "Formatge italià dur", "Manxec": "Formatge d'ovella manxec",
  "Roquefort": "Formatge blau francès", "Mozzarella": "Formatge fresc italià", "Emmental": "Formatge suís amb forats", "Gruyère": "Formatge suís",
  "Cheddar": "Formatge anglès ataronjat", "Mascarpone": "Formatge cremós italià",
  // --- Embotits ---
  "Fuet": "Embotit prim català", "Xoriço": "Embotit amb pebre vermell", "Llonganissa": "Embotit llarg curat", "Botifarra": "Embotit català per coure",
  "Salami": "Embotit italià", "Mortadel·la": "Embotit rosat de Bolonya", "Bull": "Embotit cuit català", "Sobrassada": "Embotit tou mallorquí",
  "Pernil": "Cuixa de porc curada", "Cansalada": "Greix i carn del porc (bacó)",
  // --- Salses ---
  "Pesto": "Salsa d'alfàbrega i pinyons", "Bolonyesa": "Salsa de carn i tomàquet", "Beixamel": "Salsa blanca de llet", "Pomodoro": "Salsa de tomàquet",
  "Allioli": "Salsa d'all i oli", "Maionesa": "Salsa d'ou i oli", "Tàrtara": "Maionesa amb cogombrets", "Romesco": "Salsa catalana d'ametlla i nyora",
  "Quetxup": "Salsa dolça de tomàquet", "Mostassa": "Salsa groga picant",
  // --- Balls ---
  "Vals": "Ball de parella que gira", "Tango": "Ball argentí sensual", "Bolero": "Ball espanyol pausat", "Xotis": "Ball castís de Madrid",
  "Jota": "Ball popular saltat", "Fandango": "Ball espanyol viu", "Pasdoble": "Ball de ritme marcat", "Rumba": "Ball d'origen cubà",
  "Polca": "Ball ràpid centreeuropeu", "Txa-txa-txà": "Ball llatí de ritme alegre",
  // --- Monedes ---
  "Florí": "Antiga moneda d'or", "Dracma": "Antiga moneda grega", "Escut": "Antiga moneda portuguesa", "Ducat": "Antiga moneda d'or europea",
  "Xíling": "Moneda britànica antiga / africana", "Rupia": "Moneda de l'Índia", "Còrdova": "Moneda de Nicaragua", "Lempira": "Moneda d'Hondures",
  "Ral": "Antiga moneda espanyola", "Marc": "Antiga moneda alemanya",
  // --- Bolets ---
  "Rovelló": "Bolet taronja molt apreciat", "Múrgola": "Bolet de primavera arrugat", "Camagroc": "Bolet groc de tardor",
  "Fredolic": "Bolet gris comestible", "Llenega": "Bolet viscós comestible", "Carlet": "Bolet violaci comestible", "Ou de reig": "Bolet taronja excel·lent",
  "Cep": "Bolet de barret marró carnós", "Trompeta": "Bolet negre en forma d'embut", "Pixacà": "Bolet no comestible",
  // --- Nàutica ---
  "Proa": "Part davantera del vaixell", "Popa": "Part posterior del vaixell", "Quilla": "Espina dorsal del vaixell",
  "Timó": "Per governar el rumb", "Babord": "Costat esquerre del vaixell", "Estribord": "Costat dret del vaixell", "Coberta": "Pis exterior del vaixell",
  "Àncora": "Per fixar el vaixell al fons", "Pal": "Suport vertical de les veles", "Bauprès": "Pal inclinat de la proa",
  // --- Constel·lacions ---
  "Orió": "Constel·lació del caçador", "Lira": "Constel·lació amb l'estel Vega", "Cigne": "Constel·lació en forma de creu",
  "Pegàs": "Constel·lació del cavall alat", "Andròmeda": "Constel·lació i galàxia veïna", "Cassiopea": "Constel·lació en forma de W",
  "Drac": "Constel·lació allargada del nord", "Balena": "Constel·lació equatorial", "Bover": "Constel·lació amb l'estel Arcturus", "Óssa": "Constel·lació del carro (Óssa Major)",
  // --- Mitologia ---
  "Zeus": "Déu grec del cel, rei dels déus", "Apol·lo": "Déu del sol i la música", "Hermes": "Déu missatger", "Atena": "Deessa de la saviesa",
  "Hades": "Déu del món dels morts", "Posidó": "Déu del mar", "Hefest": "Déu del foc i la forja", "Àrtemis": "Deessa de la caça",
  "Demèter": "Deessa de l'agricultura", "Ares": "Déu de la guerra",
  // --- Criatures fantàstiques ---
  "Esfinx": "Lleó amb cap humà", "Hidra": "Serp de molts caps", "Quimera": "Bèstia de parts diverses", "Grifó": "Àguila amb cos de lleó",
  "Centaure": "Meitat home, meitat cavall", "Minotaure": "Home amb cap de brau", "Basilisc": "Serp que mata amb la mirada",
  "Cíclop": "Gegant d'un sol ull", "Sirena": "Dona amb cua de peix", "Harpia": "Au amb cara de dona",
  // --- Cafès ---
  "Tallat": "Cafè amb una mica de llet", "Caputxino": "Cafè amb escuma de llet", "Espresso": "Cafè curt i intens", "Americà": "Cafè llarg amb aigua",
  "Bombó": "Cafè amb llet condensada", "Carajillo": "Cafè amb licor", "Ristretto": "Espresso encara més curt", "Cremat": "Cafè amb rom flamejat",
  "Vienès": "Cafè amb nata", "Macchiato": "Espresso amb un toc de llet",
  // --- Marisc ---
  "Pop": "Mol·lusc de vuit tentacles", "Sípia": "Mol·lusc semblant al calamar", "Calamar": "Mol·lusc allargat amb tentacles",
  "Musclo": "Mol·lusc de closca negra", "Escopinya": "Cloïssa estriada", "Cloïssa": "Mol·lusc de dues valves", "Ostra": "Mol·lusc apreciat amb perla",
  "Navalla": "Mol·lusc allargat de closca", "Garota": "Eriçó de mar", "Cargol": "Mol·lusc de closca en espiral",
  // --- Herbes ---
  "Camamilla": "Herba per a infusió calmant", "Til·la": "Infusió relaxant de tiller", "Marduix": "Herba aromàtica de cuina",
  "Sàlvia": "Herba aromàtica medicinal", "Farigola": "Timó, herba aromàtica", "Romaní": "Arbust aromàtic blau", "Menta": "Herba refrescant",
  "Melissa": "Herba de regust de llimona", "Berbena": "Herba medicinal", "Saüc": "Arbust de flors blanques medicinals",
  // --- Castells medievals ---
  "Merlet": "Dent del capdamunt de la muralla", "Fossat": "Rasa d'aigua al voltant del castell", "Torreó": "Torre gran del castell",
  "Muralla": "Mur defensiu", "Talaia": "Torre de vigilància", "Almena": "Merlet de la muralla", "Matacà": "Obertura per llançar coses a sobre",
  "Rastell": "Reixa que tanca l'entrada", "Aljub": "Dipòsit d'aigua", "Lliça": "Espai entre dues muralles",
  // --- Eines del camp ---
  "Falç": "Eina corba per segar", "Aixada": "Eina per cavar la terra", "Rascle": "Eina per rasclar la terra", "Forca": "Eina de pues per a la palla",
  "Càvec": "Aixada estreta", "Arada": "Per llaurar la terra", "Garbell": "Sedàs per garbellar gra", "Dalla": "Eina llarga per segar herba",
  "Sàrria": "Cistell doble per a bèsties", "Bieldo": "Forca de fusta per ventar el gra",
  // --- Núvols ---
  "Cúmul": "Núvol blanc i cotonós", "Cirrus": "Núvol prim i alt", "Estrat": "Núvol baix en capa", "Nimbus": "Núvol de pluja",
  "Cirrocúmul": "Núvols alts en petites bales", "Altostrat": "Capa de núvols mitjans grisa", "Lenticular": "Núvol en forma de lent",
  "Estratocúmul": "Núvols baixos en bancs"
};

if (typeof window !== "undefined") window.DEFINICIONS = DEFINICIONS;
