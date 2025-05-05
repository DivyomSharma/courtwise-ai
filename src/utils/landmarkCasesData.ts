
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
    court: "Supreme Court",
    date: "April 24, 1973",
    category: "Constitutional",
    summary: "The Supreme Court established the doctrine of the 'basic structure' of the Constitution, ruling that Parliament cannot amend the Constitution in a way that destroys its basic or essential features.",
    judges: ["S.M. Sikri", "A.N. Ray", "D.G. Palekar", "K.K. Mathew", "M.H. Beg", "J.M. Shelat", "A.N. Grover", "P. Jaganmohan Reddy", "H.R. Khanna", "Y.V. Chandrachud", "B.K. Mukherjea", "S.N. Dwivedi", "A.K. Mukherjea"],
    petitioner: "Kesavananda Bharati",
    respondent: "State of Kerala",
    key_points: [
      "Parliament's power to amend the Constitution is subject to the condition that it cannot destroy the basic structure of the Constitution.",
      "The 'basic structure' doctrine protects the fundamental features of the Constitution from being amended in a way that would alter its identity.",
      "Parliament has the power to amend any part of the Constitution, including Fundamental Rights, but cannot emasculate its basic features.",
      "The power of judicial review is a basic feature of the Constitution and cannot be taken away by amendment."
    ],
    related_cases: [
      "Golaknath v. State of Punjab (1967)",
      "Minerva Mills v. Union of India (1980)",
      "Indira Nehru Gandhi v. Raj Narain (1975)"
    ]
  },
  {
    id: "vishaka",
    title: "Vishaka vs State of Rajasthan",
    citation: "AIR 1997 SC 3011",
    court: "Supreme Court",
    date: "August 13, 1997",
    category: "Labor & Employment",
    summary: "This landmark judgment laid down guidelines to prevent sexual harassment of women at workplaces, which later formed the basis for the Sexual Harassment of Women at Workplace Act, 2013.",
    judges: ["J.S. Verma", "Sujata Manohar", "B.N. Kirpal"],
    petitioner: "Vishaka and others",
    respondent: "State of Rajasthan",
    key_points: [
      "The court formulated guidelines for employers to prevent sexual harassment at the workplace.",
      "The judgment recognized sexual harassment as a violation of fundamental rights under Articles 14, 15, 19 and 21 of the Constitution.",
      "International conventions and norms can be used to interpret domestic law when there is a void in the domestic law.",
      "The guidelines were to be treated as law until appropriate legislation was enacted by the Parliament."
    ],
    related_cases: [
      "Apparel Export Promotion Council v. A.K. Chopra (1999)",
      "Medha Kotwal Lele v. Union of India (2013)"
    ]
  },
  {
    id: "puttaswamy",
    title: "Justice K.S. Puttaswamy vs Union of India",
    citation: "AIR 2017 SC 4161",
    court: "Supreme Court",
    date: "August 24, 2017",
    category: "Constitutional",
    summary: "The Supreme Court recognized the right to privacy as a fundamental right under Article 21 of the Indian Constitution, with significant implications for data protection and personal liberty.",
    judges: ["J.S. Khehar", "J. Chelameswar", "S.A. Bobde", "R.K. Agrawal", "R.F. Nariman", "A.M. Sapre", "D.Y. Chandrachud", "S.K. Kaul", "S. Abdul Nazeer"],
    petitioner: "Justice K.S. Puttaswamy (Retd.)",
    respondent: "Union of India",
    key_points: [
      "Right to privacy is a fundamental right protected under Article 21 of the Constitution.",
      "Privacy includes personal intimacies, personal choices, informational privacy, and privacy of communications.",
      "Any invasion of privacy by the state must follow due process established by law and must be necessary and proportionate to a legitimate aim.",
      "The judgment overruled previous decisions in M.P. Sharma and Kharak Singh cases that had held privacy was not a fundamental right."
    ],
    related_cases: [
      "Navtej Singh Johar v. Union of India (2018)",
      "Joseph Shine v. Union of India (2018)",
      "Indian Young Lawyers Association v. State of Kerala (Sabarimala Temple Case) (2018)"
    ]
  },
  {
    id: "shreya-singhal",
    title: "Shreya Singhal vs Union of India",
    citation: "(2015) 5 SCC 1",
    court: "Supreme Court",
    date: "March 24, 2015",
    category: "Constitutional",
    summary: "The Supreme Court struck down Section 66A of the Information Technology Act, which criminalized sending offensive messages through communication services, as unconstitutional for violating the right to freedom of speech and expression.",
    judges: ["J. Chelameswar", "R.F. Nariman"],
    petitioner: "Shreya Singhal",
    respondent: "Union of India",
    key_points: [
      "Section 66A of the IT Act was declared unconstitutional for being vague, overbroad and creating a chilling effect on free speech.",
      "The court distinguished between discussion, advocacy, and incitement, holding that only incitement can be prohibited.",
      "Reasonable restrictions on free speech must have proximate connection with public order, not remote or far-fetched connections.",
      "The judgment emphasized the importance of protecting online speech and internet freedom."
    ],
    related_cases: [
      "Romesh Thappar v. State of Madras (1950)",
      "Bennett Coleman & Co. v. Union of India (1972)",
      "S. Rangarajan v. P. Jagjivan Ram (1989)"
    ]
  },
  {
    id: "navtej-johar",
    title: "Navtej Singh Johar vs Union of India",
    citation: "(2018) 10 SCC 1",
    court: "Supreme Court",
    date: "September 6, 2018",
    category: "Constitutional",
    summary: "The Supreme Court decriminalized consensual homosexual acts by declaring Section 377 of the Indian Penal Code unconstitutional as it violated the right to privacy, dignity, and equality.",
    judges: ["Dipak Misra", "A.M. Khanwilkar", "R.F. Nariman", "D.Y. Chandrachud", "Indu Malhotra"],
    petitioner: "Navtej Singh Johar and others",
    respondent: "Union of India",
    key_points: [
      "Section 377 of the IPC was read down to exclude consensual sexual conduct between adults of the same sex in private.",
      "The court held that sexual orientation is a natural and inherent element of identity protected under the right to privacy and dignity.",
      "Discrimination on the basis of sexual orientation violates the right to equality under Article 14 of the Constitution.",
      "The judgment emphasized that constitutional morality must prevail over social morality."
    ],
    related_cases: [
      "Suresh Kumar Koushal v. Naz Foundation (2013)",
      "NALSA v. Union of India (2014)",
      "Puttaswamy v. Union of India (2017)"
    ]
  },
  {
    id: "maneka-gandhi",
    title: "Maneka Gandhi vs Union of India",
    citation: "AIR 1978 SC 597",
    court: "Supreme Court",
    date: "January 25, 1978",
    category: "Constitutional",
    summary: "This case expanded the interpretation of Article 21 of the Constitution, holding that the right to life and personal liberty includes a bundle of rights that makes life meaningful and not merely animal existence.",
    judges: ["M. Hameedullah Beg", "Y.V. Chandrachud", "P.N. Bhagwati", "V.R. Krishna Iyer", "N.L. Untwalia", "S. Murtaza Fazal Ali", "P.S. Kailasam"],
    petitioner: "Maneka Gandhi",
    respondent: "Union of India",
    key_points: [
      "The 'procedure established by law' in Article 21 must be fair, just and reasonable, not arbitrary or oppressive.",
      "Article 21 should be read along with Articles 14 and 19 to ensure due process.",
      "The right to travel abroad is part of personal liberty under Article 21.",
      "The government must provide an opportunity to be heard before impounding a passport."
    ],
    related_cases: [
      "A.K. Gopalan v. State of Madras (1950)",
      "Kharak Singh v. State of UP (1964)",
      "R.C. Cooper v. Union of India (1970)"
    ]
  },
  {
    id: "indra-sawhney",
    title: "Indra Sawhney vs Union of India",
    citation: "AIR 1993 SC 477",
    court: "Supreme Court",
    date: "November 16, 1992",
    category: "Constitutional",
    summary: "The Supreme Court upheld the implementation of the Mandal Commission recommendations, establishing the ceiling of 50% on reservations and excluding the 'creamy layer' from reservation benefits.",
    judges: ["M.H. Kania", "M.N. Venkatachaliah", "S.R. Pandian", "T.K. Thommen", "A.M. Ahmadi", "Kuldip Singh", "P.B. Sawant", "R.M. Sahai", "B.P. Jeevan Reddy"],
    petitioner: "Indra Sawhney",
    respondent: "Union of India",
    key_points: [
      "The court upheld 27% reservation for Other Backward Classes (OBCs) in central government jobs.",
      "It established the 50% ceiling on total reservations, subject to exceptional circumstances.",
      "The 'creamy layer' within OBCs should be excluded from reservation benefits.",
      "Reservations cannot be made in promotions and should only be at the entry level."
    ],
    related_cases: [
      "M.R. Balaji v. State of Mysore (1963)",
      "State of Kerala v. N.M. Thomas (1976)",
      "K.C. Vasanth Kumar v. State of Karnataka (1985)"
    ]
  },
  {
    id: "olga-tellis",
    title: "Olga Tellis vs Bombay Municipal Corporation",
    citation: "(1985) 3 SCC 545",
    court: "Supreme Court",
    date: "July 10, 1985",
    category: "Constitutional",
    summary: "The Court held that the right to livelihood is an integral part of the right to life under Article 21, recognizing that evicting pavement dwellers without alternative accommodation violates their fundamental rights.",
    judges: ["Y.V. Chandrachud", "V.D. Tulzapurkar", "A. Varadarajan", "O. Chinnappa Reddy", "Baharul Islam"],
    petitioner: "Olga Tellis and others",
    respondent: "Bombay Municipal Corporation",
    key_points: [
      "The right to livelihood is an important facet of the right to life under Article 21.",
      "Pavement dwellers should be given reasonable notice and opportunity to explain before eviction.",
      "Alternative accommodation need not necessarily be provided, but alternative sites must be considered.",
      "Evictions without proper rehabilitation can violate fundamental rights of the urban poor."
    ],
    related_cases: [
      "Francis Coralie Mullin v. Union Territory of Delhi (1981)",
      "Chameli Singh v. State of U.P. (1996)",
      "Ahmedabad Municipal Corporation v. Nawab Khan Gulab Khan (1997)"
    ]
  },
  {
    id: "triple-talaq",
    title: "Shayara Bano vs Union of India",
    citation: "(2017) 9 SCC 1",
    court: "Supreme Court",
    date: "August 22, 2017",
    category: "Family",
    summary: "The Supreme Court declared the practice of triple talaq (instant divorce) in Islamic personal law unconstitutional by a 3:2 majority, protecting the rights of Muslim women in India.",
    judges: ["J.S. Khehar", "Kurian Joseph", "R.F. Nariman", "U.U. Lalit", "S. Abdul Nazeer"],
    petitioner: "Shayara Bano",
    respondent: "Union of India",
    key_points: [
      "Triple talaq (talaq-e-biddat) was declared unconstitutional by a 3:2 majority.",
      "The practice was found to be arbitrary and gender discriminatory.",
      "Personal laws must conform to constitutional principles and fundamental rights.",
      "The judgment led to the enactment of the Muslim Women (Protection of Rights on Marriage) Act, 2019."
    ],
    related_cases: [
      "Shah Bano Begum v. Mohammad Ahmed Khan (1985)",
      "Danial Latifi v. Union of India (2001)",
      "Shamim Ara v. State of U.P. (2002)"
    ]
  },
  {
    id: "mohori-bibee",
    title: "Mohori Bibee vs Dharmodas Ghose",
    citation: "(1903) ILR 30 Cal 539",
    court: "Privy Council",
    date: "March 18, 1903",
    category: "Contract",
    summary: "This landmark case established that a contract with a minor is void ab initio (invalid from the beginning) and cannot be enforced, setting a significant precedent in contract law.",
    judges: ["Lord Macnaghten", "Lord Davey", "Lord Lindley", "Sir Ford North", "Sir Andrew Scoble"],
    petitioner: "Mohori Bibee",
    respondent: "Dharmodas Ghose",
    key_points: [
      "A minor's contract is void ab initio, not merely voidable.",
      "The doctrine of restitution does not apply to minors to restore benefits received under void contracts.",
      "A minor cannot be compelled to repay the money advanced to him under a void contract.",
      "The principle of estoppel cannot be applied against a minor to validate a void contract."
    ],
    related_cases: [
      "Leslie v. Shiell (1914)",
      "Khan Gul v. Lakha Singh (1928)",
      "Srikakulam Subrahmanyam v. Kurra Subba Rao (1948)"
    ],
    full_text: "The plaintiff, who was at all material times a minor, mortgaged his house in favor of the defendant's firm to secure the repayment of Rs. 20,000. At the time of the execution of the mortgage, the plaintiff's mother and guardian had informed the defendant's attorney that the plaintiff was a minor. The plaintiff received only Rs. 8,000 from the loan. Later, he sued for a declaration that the mortgage was void and he was not liable for the money borrowed.\n\nThe Privy Council held that the contract was void ab initio as the plaintiff was a minor at the time of contracting. Section 11 of the Indian Contract Act, 1872 clearly provided that a person who had not attained the age of majority was incompetent to contract. The Privy Council ruled that a contract by a minor was void and not merely voidable. It further held that the principle of restitution did not apply to minors, and thus the minor plaintiff could not be compelled to repay the money advanced to him under the void contract.\n\nThis landmark judgment established the principle that a minor's agreement is void ab initio in Indian contract law, a principle that continues to be followed to this day."
  }
];
