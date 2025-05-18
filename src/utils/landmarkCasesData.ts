
export interface LandmarkCase {
  id: string;
  title: string;
  citation: string;
  court: string;
  date: string;
  category: string;
  summary: string;
  judges?: string[];
  petitioner?: string | null;
  respondent?: string | null;
  full_text?: string | null;
  key_points?: string[] | null;
  related_cases?: string[] | null;
}

export const LANDMARK_CASES: LandmarkCase[] = [
  {
    id: "kesavananda-bharati",
    title: "Kesavananda Bharati vs State of Kerala",
    citation: "AIR 1973 SC 1461",
    court: "Supreme Court of India",
    date: "April 24, 1973",
    category: "Constitutional",
    summary: "The Supreme Court established the doctrine of the 'basic structure' of the Constitution, ruling that Parliament cannot amend the Constitution in a way that destroys its basic or essential features.",
    judges: ["S.M. Sikri", "A.N. Ray", "D.G. Palekar", "K.K. Mathew", "M.H. Beg", "J.M. Shelat", "A.N. Grover", "P. Jaganmohan Reddy", "H.R. Khanna", "Y.V. Chandrachud", "B.K. Mukherjea", "S.N. Dwivedi", "A.K. Mukherjea"],
    petitioner: "Kesavananda Bharati",
    respondent: "State of Kerala",
    key_points: [
      "Parliament's power to amend the Constitution is subject to the condition that it cannot destroy the basic structure of the Constitution.",
      "The 'basic structure' doctrine protects the fundamental features of the Constitution from being amended in a way that would alter its identity.",
      "Parliament has the power to amend any part of the Constitution, including Fundamental Rights, but cannot emasculate its basic features."
    ]
  },
  {
    id: "vishaka",
    title: "Vishaka vs State of Rajasthan",
    citation: "AIR 1997 SC 3011",
    court: "Supreme Court of India",
    date: "August 13, 1997",
    category: "Labor & Employment",
    summary: "This landmark judgment laid down guidelines to prevent sexual harassment of women at workplaces, which later formed the basis for the Sexual Harassment of Women at Workplace Act, 2013.",
    judges: ["J.S. Verma", "Sujata Manohar", "B.N. Kirpal"],
    petitioner: "Vishaka and others",
    respondent: "State of Rajasthan"
  },
  {
    id: "puttaswamy",
    title: "Justice K.S. Puttaswamy vs Union of India",
    citation: "AIR 2017 SC 4161",
    court: "Supreme Court of India",
    date: "August 24, 2017",
    category: "Constitutional",
    summary: "The Supreme Court recognized the right to privacy as a fundamental right under Article 21 of the Indian Constitution, with significant implications for data protection and personal liberty.",
    judges: ["J.S. Khehar", "J. Chelameswar", "S.A. Bobde", "R.K. Agrawal", "R.F. Nariman", "A.M. Sapre", "D.Y. Chandrachud", "S.K. Kaul", "S. Abdul Nazeer"]
  },
  {
    id: "shreya-singhal",
    title: "Shreya Singhal vs Union of India",
    citation: "(2015) 5 SCC 1",
    court: "Supreme Court of India",
    date: "March 24, 2015",
    category: "Constitutional",
    summary: "The Supreme Court struck down Section 66A of the Information Technology Act, which criminalized sending offensive messages through communication services, as unconstitutional for violating the right to freedom of speech and expression.",
    judges: ["J. Chelameswar", "R.F. Nariman"]
  },
  {
    id: "navtej-johar",
    title: "Navtej Singh Johar vs Union of India",
    citation: "(2018) 10 SCC 1",
    court: "Supreme Court of India",
    date: "September 6, 2018",
    category: "Constitutional",
    summary: "The Supreme Court decriminalized consensual homosexual acts by declaring Section 377 of the Indian Penal Code unconstitutional as it violated the right to privacy, dignity, and equality.",
    judges: ["Dipak Misra", "A.M. Khanwilkar", "R.F. Nariman", "D.Y. Chandrachud", "Indu Malhotra"]
  },
  {
    id: "maneka-gandhi",
    title: "Maneka Gandhi vs Union of India",
    citation: "AIR 1978 SC 597",
    court: "Supreme Court of India",
    date: "January 25, 1978",
    category: "Constitutional",
    summary: "This case expanded the interpretation of Article 21 of the Constitution, holding that the right to life and personal liberty includes a bundle of rights that makes life meaningful and not merely animal existence.",
    judges: ["M. Hameedullah Beg", "Y.V. Chandrachud", "P.N. Bhagwati", "V.R. Krishna Iyer", "N.L. Untwalia", "S. Murtaza Fazal Ali", "P.S. Kailasam"]
  },
  {
    id: "indra-sawhney",
    title: "Indra Sawhney vs Union of India",
    citation: "AIR 1993 SC 477",
    court: "Supreme Court of India",
    date: "November 16, 1992",
    category: "Constitutional",
    summary: "The Supreme Court upheld the implementation of the Mandal Commission recommendations, establishing the ceiling of 50% on reservations and excluding the 'creamy layer' from reservation benefits.",
    judges: ["M.H. Kania", "M.N. Venkatachaliah", "S.R. Pandian", "T.K. Thommen", "A.M. Ahmadi", "Kuldip Singh", "P.B. Sawant", "R.M. Sahai", "B.P. Jeevan Reddy"]
  },
  {
    id: "olga-tellis",
    title: "Olga Tellis vs Bombay Municipal Corporation",
    citation: "(1985) 3 SCC 545",
    court: "Supreme Court of India",
    date: "July 10, 1985",
    category: "Constitutional",
    summary: "The Court held that the right to livelihood is an integral part of the right to life under Article 21, recognizing that evicting pavement dwellers without alternative accommodation violates their fundamental rights.",
    judges: ["Y.V. Chandrachud", "V.D. Tulzapurkar", "A. Varadarajan", "O. Chinnappa Reddy", "Baharul Islam"]
  },
  {
    id: "triple-talaq",
    title: "Shayara Bano vs Union of India",
    citation: "(2017) 9 SCC 1",
    court: "Supreme Court of India",
    date: "August 22, 2017",
    category: "Family",
    summary: "The Supreme Court declared the practice of triple talaq (instant divorce) in Islamic personal law unconstitutional by a 3:2 majority, protecting the rights of Muslim women in India.",
    judges: ["J.S. Khehar", "Kurian Joseph", "R.F. Nariman", "U.U. Lalit", "S. Abdul Nazeer"]
  },
  {
    id: "indian-young-lawyers",
    title: "Indian Young Lawyers Association vs The State of Kerala",
    citation: "(2019) 11 SCC 1",
    court: "Supreme Court of India",
    date: "September 28, 2018",
    category: "Constitutional",
    summary: "The Supreme Court lifted the ban on women of menstruating age from entering the Sabarimala Temple, stating that discrimination against women on the basis of physiological factors cannot be justified."
  },
  {
    id: "subhash-kashinath",
    title: "Subhash Kashinath Mahajan vs State of Maharashtra",
    citation: "(2018) 6 SCC 454",
    court: "Supreme Court of India",
    date: "March 20, 2018",
    category: "Criminal",
    summary: "The Supreme Court issued guidelines to prevent misuse of the SC/ST Act, but later recalled its directions after widespread protests and review petition."
  },
  {
    id: "joseph-shine",
    title: "Joseph Shine vs Union of India",
    citation: "(2019) 3 SCC 39",
    court: "Supreme Court of India",
    date: "September 27, 2018",
    category: "Criminal",
    summary: "The Supreme Court struck down Section 497 of the IPC, decriminalizing adultery, stating that it violated women's right to equality and dignity by treating them as property of their husbands."
  },
  {
    id: "m-nagraj",
    title: "M. Nagaraj & Others vs Union of India",
    citation: "(2006) 8 SCC 212",
    court: "Supreme Court of India",
    date: "October 19, 2006",
    category: "Constitutional",
    summary: "The Court upheld the constitutional validity of reservation in promotions for SC/STs subject to certain conditions, including quantifiable data on backwardness and inadequacy of representation."
  },
  {
    id: "mohd-ahmed-khan",
    title: "Mohd. Ahmed Khan vs Shah Bano Begum",
    citation: "AIR 1985 SC 945",
    court: "Supreme Court of India",
    date: "April 23, 1985",
    category: "Family",
    summary: "The Supreme Court held that a Muslim woman is entitled to maintenance under Section 125 of the CrPC beyond the iddat period, sparking nationwide discourse on personal laws vs. constitutional rights."
  },
  {
    id: "adc-vs-commissioner",
    title: "ADM Jabalpur vs Shivakant Shukla",
    citation: "AIR 1976 SC 1207",
    court: "Supreme Court of India",
    date: "April 28, 1976",
    category: "Constitutional",
    summary: "During the Emergency, the Court held that fundamental rights including the right to life could be suspended during National Emergency, a decision later overruled in K.S. Puttaswamy case."
  },
  {
    id: "sr-bommai",
    title: "S.R. Bommai vs Union of India",
    citation: "(1994) 3 SCC 1",
    court: "Supreme Court of India",
    date: "March 11, 1994",
    category: "Constitutional",
    summary: "This landmark judgment laid down guidelines for the exercise of presidential power under Article 356 to impose President's Rule in states, establishing judicial review of such decisions."
  },
  {
    id: "minerva-mills",
    title: "Minerva Mills Ltd. vs Union of India",
    citation: "AIR 1980 SC 1789",
    court: "Supreme Court of India",
    date: "July 31, 1980",
    category: "Constitutional",
    summary: "The Court reaffirmed the basic structure doctrine and struck down sections of the 42nd Amendment that had tried to give unlimited amending powers to Parliament."
  },
  {
    id: "rupa-ashok-hurra",
    title: "Rupa Ashok Hurra vs Ashok Hurra",
    citation: "(2002) 4 SCC 388",
    court: "Supreme Court of India",
    date: "April 10, 2002",
    category: "Constitutional",
    summary: "The Court established the 'curative petition' as a remedy to challenge the final judgment of the Supreme Court after the dismissal of a review petition."
  },
  {
    id: "bachan-singh",
    title: "Bachan Singh vs State of Punjab",
    citation: "(1980) 2 SCC 684",
    court: "Supreme Court of India",
    date: "May 9, 1980",
    category: "Criminal",
    summary: "The Court upheld the constitutional validity of death penalty, but restricted its application to the 'rarest of rare cases' where the alternative of life imprisonment is unquestionably foreclosed."
  },
  {
    id: "common-cause",
    title: "Common Cause (A Registered Society) vs Union of India",
    citation: "(2018) 5 SCC 1",
    court: "Supreme Court of India",
    date: "March 9, 2018",
    category: "Constitutional",
    summary: "The Supreme Court recognized passive euthanasia and the legal validity of 'Advance Directives' or living wills for terminally ill patients."
  },
  {
    id: "secretary-ministry",
    title: "Secretary, Ministry of Defence vs Babita Puniya",
    citation: "(2020) 7 SCC 469",
    court: "Supreme Court of India",
    date: "February 17, 2020",
    category: "Constitutional",
    summary: "The Court directed that women officers in the Indian Army be granted permanent commission on par with male officers, ending gender discrimination in army appointments."
  },
  {
    id: "ayodhya-case",
    title: "M Siddiq vs Mahant Suresh Das (Ayodhya Case)",
    citation: "(2020) 1 SCC 1",
    court: "Supreme Court of India",
    date: "November 9, 2019",
    category: "Civil",
    summary: "In this historic verdict, the Court directed that the disputed land in Ayodhya be given for the construction of a temple, while alternate land be provided for a mosque."
  },
  {
    id: "nalsa",
    title: "National Legal Services Authority vs Union of India",
    citation: "(2014) 5 SCC 438",
    court: "Supreme Court of India",
    date: "April 15, 2014",
    category: "Constitutional",
    summary: "The Court recognized transgender persons as a 'third gender' and affirmed their fundamental rights under the Constitution of India."
  },
  {
    id: "lily-thomas",
    title: "Lily Thomas vs Union of India",
    citation: "(2013) 7 SCC 653",
    court: "Supreme Court of India",
    date: "July 10, 2013",
    category: "Constitutional",
    summary: "The Court struck down Section 8(4) of the Representation of People Act which allowed convicted MPs/MLAs to continue in office pending appeal, leading to immediate disqualification upon conviction."
  }
];
