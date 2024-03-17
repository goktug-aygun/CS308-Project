const cityAirports = {
    // USA
    "New York": [
        { code: "JFK", name: "John F. Kennedy International Airport" },
        { code: "LGA", name: "LaGuardia Airport" }
    ],
    "Los Angeles": [
        { code: "LAX", name: "Los Angeles International Airport" },
        { code: "BUR", name: "Hollywood Burbank Airport" }
    ],
    "Chicago": [
        { code: "ORD", name: "O'Hare International Airport" },
        { code: "MDW", name: "Midway International Airport" }
    ],
    "Houston": [
        { code: "IAH", name: "George Bush Intercontinental Airport" },
        { code: "HOU", name: "William P. Hobby Airport" }
    ],
    "Miami": [
        { code: "MIA", name: "Miami International Airport" },
        { code: "FLL", name: "Fort Lauderdale-Hollywood International Airport" }
    ],
    "San Francisco": [
        { code: "SFO", name: "San Francisco International Airport" },
        { code: "OAK", name: "Oakland International Airport" }
    ],
    "Las Vegas": [
        { code: "LAS", name: "McCarran International Airport" },
        { code: "VGT", name: "North Las Vegas Airport" }
    ],
    "Seattle": [
        { code: "SEA", name: "Seattle-Tacoma International Airport" },
        { code: "BFI", name: "Boeing Field" }
    ],
    "Boston": [
        { code: "BOS", name: "Logan International Airport" },
        { code: "OWD", name: "Norwood Memorial Airport" }
    ],
    "Atlanta": [
        { code: "ATL", name: "Hartsfield-Jackson Atlanta International Airport" },
        { code: "FTY", name: "Fulton County Airport" }
    ],
    // Canada
    "Toronto": [
        { code: "YYZ", name: "Toronto Pearson International Airport" },
        { code: "YTZ", name: "Billy Bishop Toronto City Airport" }
    ],
    "Vancouver": [
        { code: "YVR", name: "Vancouver International Airport" }
    ],
    "Montreal": [
        { code: "YUL", name: "Montréal-Pierre Elliott Trudeau International Airport" },
        { code: "YHU", name: "Montréal/Saint-Hubert Airport" }
    ],
    "Calgary": [
        { code: "YYC", name: "Calgary International Airport" }
    ],
    "Ottawa": [
        { code: "YOW", name: "Ottawa Macdonald-Cartier International Airport" }
    ],
    "Edmonton": [
        { code: "YEG", name: "Edmonton International Airport" }
    ],
    "Quebec City": [
        { code: "YQB", name: "Québec City Jean Lesage International Airport" }
    ],
    "Winnipeg": [
        { code: "YWG", name: "Winnipeg James Armstrong Richardson International Airport" }
    ],
    "Halifax": [
        { code: "YHZ", name: "Halifax Stanfield International Airport" }
    ],
    "Victoria": [
        { code: "YYJ", name: "Victoria International Airport" }
    ], 
    // UK
    "London": [
        { code: "LHR", name: "Heathrow Airport" },
        { code: "LGW", name: "Gatwick Airport" }
    ],
    "Manchester": [
        { code: "MAN", name: "Manchester Airport" }
    ],
    "Birmingham": [
        { code: "BHX", name: "Birmingham Airport" }
    ],
    "Glasgow": [
        { code: "GLA", name: "Glasgow Airport" }
    ],
    "Liverpool": [
        { code: "LPL", name: "Liverpool John Lennon Airport" }
    ],
    "Edinburgh": [
        { code: "EDI", name: "Edinburgh Airport" }
    ],
    "Bristol": [
        { code: "BRS", name: "Bristol Airport" }
    ],
    "Leeds": [
        { code: "LBA", name: "Leeds Bradford Airport" }
    ],
    "Sheffield": [
        { code: "DSA", name: "Doncaster Sheffield Airport" }
    ],
    "Newcastle upon Tyne": [
        { code: "NCL", name: "Newcastle International Airport" }
    ],
    // Germany
    "Berlin": [
        { code: "TXL", name: "Berlin Tegel Airport" },
        { code: "SXF", name: "Berlin Schönefeld Airport" }
    ],
    "Munich": [
        { code: "MUC", name: "Munich Airport" }
    ],
    "Hamburg": [
        { code: "HAM", name: "Hamburg Airport" }
    ],
    "Frankfurt": [
        { code: "FRA", name: "Frankfurt Airport" }
    ],
    "Cologne": [
        { code: "CGN", name: "Cologne Bonn Airport" }
    ],
    "Stuttgart": [
        { code: "STR", name: "Stuttgart Airport" }
    ],
    "Düsseldorf": [
        { code: "DUS", name: "Düsseldorf Airport" }
    ],
    "Dortmund": [
        { code: "DTM", name: "Dortmund Airport" }
    ],
    "Bremen": [
        { code: "BRE", name: "Bremen Airport" }
    ], 
    // France
    "Paris": [
        { code: "CDG", name: "Charles de Gaulle Airport" },
        { code: "ORY", name: "Orly Airport" }
    ],
    "Marseille": [
        { code: "MRS", name: "Marseille Provence Airport" }
    ],
    "Lyon": [
        { code: "LYS", name: "Lyon–Saint-Exupéry Airport" }
    ],
    "Toulouse": [
        { code: "TLS", name: "Toulouse–Blagnac Airport" }
    ],
    "Nice": [
        { code: "NCE", name: "Nice Côte d'Azur Airport" }
    ],
    "Nantes": [
        { code: "NTE", name: "Nantes Atlantique Airport" }
    ],
    "Strasbourg": [
        { code: "SXB", name: "Strasbourg Airport" }
    ],
    "Montpellier": [
        { code: "MPL", name: "Montpellier–Méditerranée Airport" }
    ],
    "Bordeaux": [
        { code: "BOD", name: "Bordeaux–Mérignac Airport" }
    ],
    "Lille": [
        { code: "LIL", name: "Lille Airport" }
    ],
    // Australia
    "Sydney": [
        { code: "SYD", name: "Sydney Kingsford Smith Airport" }
    ],
    "Melbourne": [
        { code: "MEL", name: "Melbourne Airport" }
    ],
    "Brisbane": [
        { code: "BNE", name: "Brisbane Airport" }
    ],
    "Perth": [
        { code: "PER", name: "Perth Airport" }
    ],
    "Adelaide": [
        { code: "ADL", name: "Adelaide Airport" }
    ],
    "Gold Coast": [
        { code: "OOL", name: "Gold Coast Airport" }
    ],
    "Canberra": [
        { code: "CBR", name: "Canberra Airport" }
    ],
    "Newcastle": [
        { code: "NTL", name: "Newcastle Airport" }
    ],
    "Hobart": [
        { code: "HBA", name: "Hobart International Airport" }
    ],
    // Spain
    "Madrid": [
        { code: "MAD", name: "Adolfo Suárez Madrid–Barajas Airport" }
    ],
    "Barcelona": [
        { code: "BCN", name: "Barcelona–El Prat Airport" }
    ],
    "Valencia": [
        { code: "VLC", name: "Valencia Airport" }
    ],
    "Seville": [
        { code: "SVQ", name: "Seville Airport" }
    ],
    "Zaragoza": [
        { code: "ZAZ", name: "Zaragoza Airport" }
    ],
    "Málaga": [
        { code: "AGP", name: "Málaga Airport" }
    ],
    "Murcia": [
        { code: "RMU", name: "Murcia–San Javier Airport" }
    ],
    "Palma": [
        { code: "PMI", name: "Palma de Mallorca Airport" }
    ],
    "Las Palmas": [
        { code: "LPA", name: "Gran Canaria Airport" }
    ],
    "Bilbao": [
        { code: "BIO", name: "Bilbao Airport" }
    ],
    // Italy
    "Rome": [
        { code: "FCO", name: "Leonardo da Vinci–Fiumicino Airport" },
        { code: "CIA", name: "Ciampino–G. B. Pastine International Airport" }
    ],
    "Milan": [
        { code: "MXP", name: "Milan Malpensa Airport" },
        { code: "LIN", name: "Milan Linate Airport" }
    ],
    "Naples": [
        { code: "NAP", name: "Naples International Airport" }
    ],
    "Turin": [
        { code: "TRN", name: "Turin Airport" }
    ],
    "Palermo": [
        { code: "PMO", name: "Falcone–Borsellino Airport" }
    ],
    "Genoa": [
        { code: "GOA", name: "Genoa Cristoforo Colombo Airport" }
    ],
    "Bologna": [
        { code: "BLQ", name: "Bologna Guglielmo Marconi Airport" }
    ],
    "Florence": [
        { code: "FLR", name: "Florence Airport" }
    ],
    "Bari": [
        { code: "BRI", name: "Bari Karol Wojtyła Airport" }
    ],
    "Catania": [
        { code: "CTA", name: "Catania–Fontanarossa Airport" }
    ],
    // China
    "Shanghai": [
        { code: "PVG", name: "Shanghai Pudong International Airport" },
        { code: "SHA", name: "Shanghai Hongqiao International Airport" }
    ],
    "Beijing": [
        { code: "PEK", name: "Beijing Capital International Airport" }
    ],
    "Guangzhou": [
        { code: "CAN", name: "Guangzhou Baiyun International Airport" }
    ],
    "Shenzhen": [
        { code: "SZX", name: "Shenzhen Bao'an International Airport" }
    ],
    "Wuhan": [
        { code: "WUH", name: "Wuhan Tianhe International Airport" }
    ],
    "Tianjin": [
        { code: "TSN", name: "Tianjin Binhai International Airport" }
    ],
    "Chongqing": [
        { code: "CKG", name: "Chongqing Jiangbei International Airport" }
    ],
    "Chengdu": [
        { code: "CTU", name: "Chengdu Shuangliu International Airport" }
    ],
    "Nanjing": [
        { code: "NKG", name: "Nanjing Lukou International Airport" }
    ],
    "Xi'an": [
        { code: "XIY", name: "Xi'an Xianyang International Airport" }
    ],
    // Japan
    "Tokyo": [
        { code: "HND", name: "Haneda Airport" },
        { code: "NRT", name: "Narita International Airport" }
    ],
    "Osaka": [
        { code: "KIX", name: "Kansai International Airport" },
        { code: "ITM", name: "Osaka International Airport" }
    ],
    "Nagoya": [
        { code: "NGO", name: "Chubu Centrair International Airport" }
    ],
    "Sapporo": [
        { code: "CTS", name: "New Chitose Airport" }
    ],
    "Fukuoka": [
        { code: "FUK", name: "Fukuoka Airport" }
    ],
    "Kobe": [
        { code: "UKB", name: "Kobe Airport" }
    ],
    "Kyoto": [
        { code: "UKY", name: "Kyoto Tamba Airport" }
    ],
    "Hiroshima": [
        { code: "HIJ", name: "Hiroshima Airport" }
    ],
    "Sendai": [
        { code: "SDJ", name: "Sendai Airport" }
    ],
    // Mexico
    "Mexico City": [
        { code: "MEX", name: "Mexico City International Airport" }
    ],
    "Guadalajara": [
        { code: "GDL", name: "Guadalajara International Airport" }
    ],
    "Monterrey": [
        { code: "MTY", name: "Monterrey International Airport" }
    ],
    "Puebla": [
        { code: "PBC", name: "Puebla International Airport" }
    ],
    "Tijuana": [
        { code: "TIJ", name: "Tijuana International Airport" }
    ],
    "León": [
        { code: "BJX", name: "Del Bajío International Airport" }
    ],
    "Juárez": [
        { code: "CJS", name: "Abraham González International Airport" }
    ],
    "Mérida": [
        { code: "MID", name: "Manuel Crescencio Rejón International Airport" }
    ],
    "Acapulco": [
        { code: "ACA", name: "General Juan N. Álvarez International Airport" }
    ],
    // Brazil
    "São Paulo": [
        { code: "GRU", name: "São Paulo/Guarulhos–Governador André Franco Montoro International Airport" },
        { code: "CGH", name: "São Paulo/Congonhas Airport" }
    ],
    "Rio de Janeiro": [
        { code: "GIG", name: "Rio de Janeiro/Galeão–Antonio Carlos Jobim International Airport" },
        { code: "SDU", name: "Rio de Janeiro/Santos Dumont Airport" }
    ],
    "Salvador": [
        { code: "SSA", name: "Salvador-Deputado Luís Eduardo Magalhães International Airport" }
    ],
    "Brasília": [
        { code: "BSB", name: "Brasília International Airport" }
    ],
    "Fortaleza": [
        { code: "FOR", name: "Pinto Martins – Fortaleza International Airport" }
    ],
    "Belo Horizonte": [
        { code: "CNF", name: "Tancredo Neves International Airport" },
        { code: "PLU", name: "Belo Horizonte/Pampulha – Carlos Drummond de Andrade Airport" }
    ],
    "Manaus": [
        { code: "MAO", name: "Manaus/Eduardo Gomes International Airport" }
    ],
    "Curitiba": [
        { code: "CWB", name: "Afonso Pena International Airport" }
    ],
    "Recife": [
        { code: "REC", name: "Recife/Guararapes–Gilberto Freyre International Airport" }
    ],
    "Porto Alegre": [
        { code: "POA", name: "Salgado Filho International Airport" }
    ],
    // Russia
    "Moscow": [
        { code: "SVO", name: "Sheremetyevo International Airport" },
        { code: "DME", name: "Domodedovo International Airport" },
        { code: "VKO", name: "Vnukovo International Airport" }
    ],
    "Saint Petersburg": [
        { code: "LED", name: "Pulkovo Airport" }
    ],
    "Novosibirsk": [
        { code: "OVB", name: "Tolmachevo Airport" }
    ],
    "Yekaterinburg": [
        { code: "SVX", name: "Koltsovo International Airport" }
    ],
    "Nizhny Novgorod": [
        { code: "GOJ", name: "Strigino Airport" }
    ],
    "Kazan": [
        { code: "KZN", name: "Kazan International Airport" }
    ],
    "Chelyabinsk": [
        { code: "CEK", name: "Chelyabinsk Airport" }
    ],
    "Omsk": [
        { code: "OMS", name: "Omsk Tsentralny Airport" }
    ],
    "Samara": [
        { code: "KUF", name: "Kurumoch International Airport" }
    ],
    "Rostov-on-Don": [
        { code: "ROV", name: "Platov International Airport" }
    ],
    // India
    "Mumbai": [
        { code: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport" }
    ],
    "Delhi": [
        { code: "DEL", name: "Indira Gandhi International Airport" }
    ],
    "Bangalore": [
        { code: "BLR", name: "Kempegowda International Airport" }
    ],
    "Hyderabad": [
        { code: "HYD", name: "Rajiv Gandhi International Airport" }
    ],
    "Chennai": [
        { code: "MAA", name: "Chennai International Airport" }
    ],
    "Kolkata": [
        { code: "CCU", name: "Netaji Subhas Chandra Bose International Airport" }
    ],
    "Ahmedabad": [
        { code: "AMD", name: "Sardar Vallabhbhai Patel International Airport" }
    ],
    "Pune": [
        { code: "PNQ", name: "Pune Airport" }
    ],
    "Surat": [
        { code: "STV", name: "Surat Airport" }
    ],
    "Jaipur": [
        { code: "JAI", name: "Jaipur International Airport" }
    ],
    // South Africa
    "Johannesburg": [
        { code: "JNB", name: "O.R. Tambo International Airport" },
        { code: "HLA", name: "Lanseria International Airport" }
    ],
    "Cape Town": [
        { code: "CPT", name: "Cape Town International Airport" }
    ],
    "Durban": [
        { code: "DUR", name: "King Shaka International Airport" }
    ],
    "Port Elizabeth": [
        { code: "PLZ", name: "Port Elizabeth Airport" }
    ],
    "Bloemfontein": [
        { code: "BFN", name: "Bram Fischer International Airport" }
    ],
    "East London": [
        { code: "ELS", name: "East London Airport" }
    ],
    "Nelspruit": [
        { code: "MQP", name: "Kruger Mpumalanga International Airport" }
    ],
    "Kimberley": [
        { code: "KIM", name: "Kimberley Airport" }
    ],
    // Argentina
    "Buenos Aires": [
        { code: "EZE", name: "Ministro Pistarini International Airport" },
        { code: "AEP", name: "Jorge Newbery Airfield" }
    ],
    "Córdoba": [
        { code: "COR", name: "Ingeniero Aeronáutico Ambrosio L.V. Taravella International Airport" }
    ],
    "Rosario": [
        { code: "ROS", name: "Islas Malvinas International Airport" }
    ],
    "Mendoza": [
        { code: "MDZ", name: "Governor Francisco Gabrielli International Airport" }
    ],
    "San Miguel de Tucumán": [
        { code: "TUC", name: "Teniente General Benjamín Matienzo International Airport" }
    ],
    "La Plata": [
        { code: "LPG", name: "La Plata Airport" }
    ],
    "Mar del Plata": [
        { code: "MDQ", name: "Astor Piazzolla International Airport" }
    ],
    "Salta": [
        { code: "SLA", name: "Martín Miguel de Güemes International Airport" }
    ],
    "Santa Fe": [
        { code: "SFN", name: "Sauce Viejo Airport" }
    ],
    "San Juan": [
        { code: "UAQ", name: "Domingo Faustino Sarmiento Airport" }
    ],
    // South Korea
    "Seoul": [
        { code: "ICN", name: "Incheon International Airport" },
        { code: "GMP", name: "Gimpo International Airport" }
    ],
    "Busan": [
        { code: "PUS", name: "Gimhae International Airport" }
    ],
    "Incheon": [
        { code: "ICN", name: "Incheon International Airport" }
    ],
    "Daegu": [
        { code: "TAE", name: "Daegu International Airport" }
    ],
    "Daejeon": [
        { code: "CJJ", name: "Cheongju International Airport" }
    ],
    "Gwangju": [
        { code: "KWJ", name: "Gwangju Airport" }
    ],
    "Suwon": [
        { code: "RKSO", name: "Suwon Air Base" }
    ],
    "Ulsan": [
        { code: "USN", name: "Ulsan Airport" }
    ],
    "Changwon": [
        { code: "CHF", name: "Changwon Airport" }
    ],
    "Seongnam": [
        { code: "SSN", name: "Seongnam Air Base" }
    ],
    // Turkey
    "Istanbul": [
        { code: "IST", name: "Istanbul Airport" },
        { code: "SAW", name: "Sabiha Gökçen International Airport" }
    ],
    "Ankara": [
        { code: "ESB", name: "Esenboğa International Airport" }
    ],
    "Izmir": [
        { code: "ADB", name: "İzmir Adnan Menderes Airport" }
    ],
    "Bursa": [
        { code: "YEI", name: "Yenişehir Airport" }
    ],
    "Adana": [
        { code: "ADA", name: "Adana Şakirpaşa Airport" }
    ],
    "Gaziantep": [
        { code: "GZT", name: "Gaziantep Airport" }
    ],
    "Konya": [
        { code: "KYA", name: "Konya Airport" }
    ],
    "Antalya": [
        { code: "AYT", name: "Antalya Airport" }
    ],
    "Mersin": [
        { code: "ERC", name: "Mersin Erdemli Airport" }
    ],
    "Kayseri": [
        { code: "ASR", name: "Kayseri Airport" }
    ],
    // Thailand
    "Bangkok": [
        { code: "BKK", name: "Suvarnabhumi Airport" },
        { code: "DMK", name: "Don Mueang International Airport" }
    ],
    "Nakhon Ratchasima": [
        { code: "NAK", name: "Nakhon Ratchasima Airport" }
    ],
    "Chiang Mai": [
        { code: "CNX", name: "Chiang Mai International Airport" }
    ],
    "Hat Yai": [
        { code: "HDY", name: "Hat Yai International Airport" }
    ],
    "Udon Thani": [
        { code: "UTH", name: "Udon Thani International Airport" }
    ],
    "Khon Kaen": [
        { code: "KKC", name: "Khon Kaen Airport" }
    ],
    "Ubon Ratchathani": [
        { code: "UBP", name: "Ubon Ratchathani Airport" }
    ]
};

const countryCities = {
    "USA": ["New York", "Los Angeles", "Chicago", "Houston", "Miami", "San Francisco", "Las Vegas", "Seattle", "Boston", "Atlanta"],
    "Canada": ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa", "Edmonton", "Quebec City", "Winnipeg", "Halifax", "Victoria"],
    "UK": ["London", "Manchester", "Birmingham", "Glasgow", "Liverpool", "Edinburgh", "Bristol", "Leeds", "Sheffield", "Newcastle upon Tyne"],
    "Germany": ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne", "Stuttgart", "Düsseldorf", "Dortmund", "Bremen"],
    "France": ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille"],
    "Australia": ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Canberra", "Newcastle", "Hobart"],
    "Spain": ["Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza", "Málaga", "Murcia", "Palma", "Las Palmas", "Bilbao"],
    "Italy": ["Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa", "Bologna", "Florence", "Bari", "Catania"],
    "China": ["Shanghai", "Beijing", "Guangzhou", "Shenzhen", "Wuhan", "Tianjin", "Chongqing", "Chengdu", "Nanjing", "Xi'an"],
    "Japan": ["Tokyo", "Osaka", "Nagoya", "Sapporo", "Fukuoka", "Kobe", "Kyoto", "Hiroshima", "Sendai"],
    "Mexico": ["Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana", "León", "Juárez", "Mérida", "Acapulco"],
    "Brazil": ["São Paulo", "Rio de Janeiro", "Salvador", "Brasília", "Fortaleza", "Belo Horizonte", "Manaus", "Curitiba", "Recife", "Porto Alegre"],
    "Russia": ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Nizhny Novgorod", "Kazan", "Chelyabinsk", "Omsk", "Samara", "Rostov-on-Don"],
    "India": ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad", "Pune", "Surat", "Jaipur"],
    "South Africa": ["Johannesburg", "Cape Town", "Durban","Port Elizabeth", "Bloemfontein", "East London", "Nelspruit", "Kimberley"],
    "Argentina": ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "San Miguel de Tucumán", "La Plata", "Mar del Plata", "Salta", "Santa Fe", "San Juan"],
    "South Korea": ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon", "Gwangju", "Suwon", "Ulsan", "Changwon", "Seongnam"],
    "Turkey": ["Istanbul", "Ankara", "Izmir", "Bursa", "Adana", "Gaziantep", "Konya", "Antalya", "Mersin", "Kayseri"],
    "Thailand": ["Bangkok", "Nakhon Ratchasima", "Chiang Mai", "Hat Yai", "Udon Thani", "Khon Kaen", "Ubon Ratchathani"]
};

module.exports = {
    cityAirports,
    countryCities
};