
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.32.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get request body
    const { secretKey } = await req.json();
    
    // Simple security check - in a real app, you'd use a better mechanism
    if (secretKey !== 'courtwise-seed-key') {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    // Sample case data
    const cases = [
      {
        title: "Kesavananda Bharati vs State of Kerala",
        citation: "AIR 1973 SC 1461",
        court: "Supreme Court",
        date: "1973-04-24",
        category: "Constitutional",
        judges: ["S.M. Sikri CJ", "A.N. Ray", "D.G. Palekar", "K.K. Mathew", "M.H. Beg", "J.M. Shelat"],
        petitioner: "His Holiness Kesavananda Bharati Sripadagalvaru",
        respondent: "State of Kerala and Another",
        summary: "The Supreme Court established the doctrine of the 'basic structure' of the Constitution, ruling that Parliament cannot amend the Constitution in a way that destroys its basic or essential features.",
        full_text: "This landmark case was heard for 68 days and resulted in the most voluminous judgment in the history of the Supreme Court at that time. The 13-judge bench delivered 11 separate judgments, which were summarized by Justice H.R. Khanna.\n\nThe case arose from the 24th, 25th, and 29th amendments to the Constitution, which were challenged on the grounds that they violated the \"basic structure\" of the Constitution. The petitioner, Kesavananda Bharati, was the head of a Hindu monastery in Kerala who challenged the Kerala government's land reforms acts.\n\nBy a narrow margin of 7:6, the Supreme Court held that the Parliament could amend any part of the Constitution, including the Fundamental Rights, but it cannot destroy the \"basic structure\" of the Constitution. While the Court did not precisely define what constitutes the \"basic structure,\" it included elements such as:\n\n1. Supremacy of the Constitution\n2. Republican and democratic form of government\n3. Secular character of the Constitution\n4. Separation of powers\n5. Federal character of the Constitution\n\nThis doctrine has since been used to invalidate several constitutional amendments and has become a cornerstone of Indian constitutional law.",
        key_points: [
          "Established the 'Basic Structure Doctrine' in Indian constitutional law",
          "Held that Parliament cannot amend the Constitution to destroy its basic features",
          "Limited the amending power of Parliament under Article 368",
          "Partially overruled the decision in Golak Nath v. State of Punjab",
          "One of the most significant constitutional cases in Indian judicial history"
        ],
        related_cases: [
          "Golak Nath v. State of Punjab (1967)",
          "Minerva Mills v. Union of India (1980)",
          "Indira Gandhi v. Raj Narain (1975)"
        ]
      },
      {
        title: "Maneka Gandhi vs Union of India",
        citation: "AIR 1978 SC 597",
        court: "Supreme Court",
        date: "1978-01-25",
        category: "Constitutional",
        judges: ["M. H. Beg CJ", "Y. V. Chandrachud", "P. N. Bhagwati", "N. L. Untwalia", "S. Murtaza Fazal Ali", "P. S. Kailasam", "V. R. Krishna Iyer"],
        petitioner: "Maneka Gandhi",
        respondent: "Union of India",
        summary: "The Supreme Court expanded the interpretation of Article 21 (protection of life and personal liberty) to include the right to live with human dignity and established that any procedure which deprives a person of liberty must be just, fair, and reasonable.",
        full_text: "This landmark judgment significantly expanded the scope of personal liberty under Article 21 of the Indian Constitution. The case arose when Maneka Gandhi's passport was impounded by the Central Government under the Passport Act, 1967, without providing any reason.\n\nThe Supreme Court held that the right to travel abroad is a part of the 'personal liberty' within the meaning of Article 21. More importantly, the Court propounded the 'due process' doctrine, even though those words are not explicitly used in the Indian Constitution.\n\nJustice P.N. Bhagwati observed that the procedure prescribed by law for depriving a person of their liberty under Article 21 must be 'right, just and fair' and not arbitrary, fanciful, or oppressive. The Court also held that the 'procedure established by law' should be in conformity with the principles of natural justice.\n\nThe Court further held that Articles 14, 19, and 21 are not mutually exclusive but form a unified web of protection, establishing the 'golden triangle' of fundamental rights. Thus, any law prescribing a procedure for depriving a person of 'personal liberty' must satisfy the requirements of all three articles.\n\nThis case marked a significant departure from the Court's earlier decision in A.K. Gopalan v. State of Madras (1950) and established a more progressive and rights-oriented jurisprudence.",
        key_points: [
          "Expanded the interpretation of Article 21 to include the right to live with human dignity",
          "Established that the procedure depriving liberty must be just, fair, and reasonable",
          "Formed the 'golden triangle' of fundamental rights (Articles 14, 19, and 21)",
          "Overruled the narrow interpretation in A.K. Gopalan case",
          "Introduced the due process doctrine into Indian constitutional law"
        ],
        related_cases: [
          "A.K. Gopalan v. State of Madras (1950)",
          "Kharak Singh v. State of Uttar Pradesh (1963)",
          "Francis Coralie Mullin v. Administrator, Union Territory of Delhi (1981)"
        ]
      },
      {
        title: "Vishaka vs State of Rajasthan",
        citation: "AIR 1997 SC 3011",
        court: "Supreme Court",
        date: "1997-08-13",
        category: "Labour",
        judges: ["J.S. Verma CJ", "Sujata Manohar", "B.N. Kirpal"],
        petitioner: "Vishaka and Others",
        respondent: "State of Rajasthan and Others",
        summary: "The Supreme Court formulated guidelines for preventing sexual harassment of women at workplaces, which came to be known as the 'Vishaka Guidelines', later enacted as The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013.",
        full_text: "This landmark judgment was prompted by the gang rape of a social worker in Rajasthan. Due to the absence of domestic law occupying the field, the Supreme Court, in exercise of its powers under Article 32 of the Constitution, formulated guidelines to address and prevent sexual harassment of women at workplaces.\n\nThe Court relied on the Convention on the Elimination of All Forms of Discrimination Against Women (CEDAW), which India had ratified, and invoked international conventions and norms to fill the legislative vacuum. The guidelines defined sexual harassment, placed responsibility on employers to prevent harassment, and established complaint mechanisms.\n\nThe Court defined sexual harassment as any unwelcome sexually determined behavior such as physical contact, sexual remarks, showing pornography, or any other unwelcome physical, verbal, or non-verbal conduct of a sexual nature.\n\nThe Vishaka Guidelines remained the law until the enactment of The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act in 2013, which incorporated many of the guidelines' principles.\n\nThis case is a significant example of judicial activism, where the Court not only interpreted the law but also created it to fill a legislative void, demonstrating the dynamic role of the judiciary in protecting fundamental rights.",
        key_points: [
          "Formulated guidelines for preventing sexual harassment at workplaces",
          "Relied on international conventions to fill a domestic legal vacuum",
          "Defined sexual harassment in the workplace context",
          "Established employers' responsibilities and complaint mechanisms",
          "Later enacted into legislation as The Sexual Harassment of Women at Workplace Act, 2013"
        ],
        related_cases: [
          "Medha Kotwal Lele v. Union of India (2013)",
          "Apparel Export Promotion Council v. A.K. Chopra (1999)"
        ]
      },
      {
        title: "Navtej Singh Johar vs Union of India",
        citation: "AIR 2018 SC 4321",
        court: "Supreme Court",
        date: "2018-09-06",
        category: "Constitutional",
        judges: ["Dipak Misra CJ", "R.F. Nariman", "D.Y. Chandrachud", "Indu Malhotra", "A.M. Khanwilkar"],
        petitioner: "Navtej Singh Johar & Others",
        respondent: "Union of India",
        summary: "The Supreme Court decriminalized consensual homosexual acts by declaring Section 377 of the Indian Penal Code unconstitutional insofar as it criminalized consensual sexual conduct between adults of the same sex.",
        full_text: "In this historic judgment, the Supreme Court of India unanimously held that Section 377 of the Indian Penal Code, 1860, which criminalized 'carnal intercourse against the order of nature', was unconstitutional insofar as it criminalized consensual sexual conduct between adults of the same sex.\n\nThe Court overruled its previous decision in Suresh Kumar Koushal v. Naz Foundation (2013) and partially struck down Section 377 as violative of the right to equality, non-discrimination, freedom of expression, and the right to life and personal liberty. The Court held that sexual orientation is an intrinsic element of liberty, dignity, privacy, and personal autonomy guaranteed under the Constitution.\n\nChief Justice Dipak Misra observed that 'Section 377 insofar as it criminalises consensual sexual acts of adults in private, is violative of Articles 14, 15, 19, and 21 of the Constitution. It is, however, clarified that such consent must be free consent, which is completely voluntary in nature, and devoid of any duress or coercion.'\n\nJustice D.Y. Chandrachud's concurring opinion noted that the case was not merely about decriminalizing homosexuality, but about recognizing an individual's right to dignity and autonomy. He held that Section 377 had the effect of perpetuating social stigma and discrimination against the LGBTQ+ community.\n\nThe judgment marked a significant step toward recognizing the rights and dignity of the LGBTQ+ community in India and established that constitutional morality must prevail over social morality when the latter violates fundamental rights.",
        key_points: [
          "Decriminalized consensual homosexual acts between adults",
          "Partially struck down Section 377 of the Indian Penal Code",
          "Recognized sexual orientation as an intrinsic element of liberty and dignity",
          "Overruled the previous Suresh Kumar Koushal decision",
          "Established that constitutional morality prevails over social morality"
        ],
        related_cases: [
          "Suresh Kumar Koushal v. Naz Foundation (2013)",
          "NALSA v. Union of India (2014)",
          "Justice K.S. Puttaswamy v. Union of India (2017)"
        ]
      },
      {
        title: "M.C. Mehta vs Union of India",
        citation: "AIR 1987 SC 1086",
        court: "Supreme Court",
        date: "1987-04-12",
        category: "Environmental",
        judges: ["P.N. Bhagwati CJ", "R.S. Pathak", "Amarendra Nath Sen", "E.S. Venkataramiah", "Sabyasachi Mukharji"],
        petitioner: "M.C. Mehta",
        respondent: "Union of India and Others",
        summary: "This case established the principle of absolute liability for industries engaged in hazardous activities, holding that such industries must ensure safety and cannot claim exemptions based on traditional defenses.",
        full_text: "This landmark environmental law case arose in the aftermath of the oleum gas leak from the Shriram Food and Fertilizers factory in Delhi, which affected many people. Public interest litigator M.C. Mehta filed a petition seeking closure of hazardous industries in Delhi.\n\nThe Supreme Court used this opportunity to establish the principle of 'absolute liability', which is stricter than the 'strict liability' rule established in the English case of Rylands v. Fletcher. Under absolute liability, an enterprise engaged in hazardous or inherently dangerous activities has an absolute and non-delegable duty to ensure that no harm results from its activities. If harm does occur, the enterprise is absolutely liable to compensate those affected, without any exceptions.\n\nChief Justice P.N. Bhagwati observed that 'we have to evolve new principles and lay down new norms which will adequately deal with new problems which arise in a highly industrialized economy. We cannot allow our judicial thinking to be constricted by reference to the law as it prevails in England or for that matter in any other foreign country.'\n\nThe Court also introduced the concept of 'deep pocket theory', stating that the amount of compensation should be correlated to the magnitude and capacity of the enterprise, as larger and more prosperous the enterprise, the greater must be the amount of compensation payable by it.\n\nThis case represents a significant development in Indian environmental jurisprudence and demonstrates the Court's willingness to evolve innovative principles to address emerging environmental challenges.",
        key_points: [
          "Established the principle of 'absolute liability' for hazardous industries",
          "Eliminated traditional defenses available under strict liability",
          "Introduced the 'deep pocket theory' for determining compensation",
          "Expanded the scope of Article 21 to include the right to a clean environment",
          "Pioneered environmental jurisprudence in India"
        ],
        related_cases: [
          "M.C. Mehta v. Union of India (Taj Trapezium Case)",
          "M.C. Mehta v. Union of India (Vehicular Pollution Case)",
          "Indian Council for Enviro-Legal Action v. Union of India (1996)"
        ]
      },
      {
        title: "Indian Hotel & Restaurant Association vs State of Maharashtra",
        citation: "AIR 2019 SC 589",
        court: "Mumbai High Court",
        date: "2019-01-17",
        category: "Administrative",
        judges: ["R.M. Borde", "S.M. Modak"],
        petitioner: "Indian Hotel & Restaurant Association & Others",
        respondent: "State of Maharashtra & Others",
        summary: "This case challenged the constitutional validity of the Maharashtra government's ban on dance performances in hotels and restaurants, eventually leading to the lifting of the ban with certain conditions.",
        full_text: "This case challenged the constitutional validity of the Maharashtra government's amendments to the Maharashtra Police Act, 1951, which prohibited dance performances in hotels, restaurants, bars, and other establishments.\n\nThe petitioners contended that the amendments violated their fundamental rights under Articles 14, 19(1)(g), and 21 of the Constitution. They argued that the ban on dance performances unfairly targeted a particular class of establishments and deprived dancers of their livelihood without reasonable justification.\n\nThe Supreme Court held that the state had failed to justify how the prohibition on dance performances in establishments serving alcohol would achieve the purpose of protecting women's dignity and preventing their exploitation. The Court found that the restrictions were arbitrary and disproportionate.\n\nWhile recognizing the state's authority to regulate such performances and impose reasonable restrictions, the Court emphasized that a complete prohibition was unconstitutional. The Court allowed dance performances with certain conditions, such as fixed remuneration for performers, prohibition on throwing money on dancers, and maintaining a certain distance between performers and the audience.\n\nThis judgment highlighted the need to balance regulatory powers with fundamental rights and demonstrated that even when the state aims to protect dignity and prevent exploitation, its measures must be proportionate and not deprive individuals of their constitutional rights.",
        key_points: [
          "Lifted the ban on dance performances in hotels and restaurants",
          "Found the prohibition to be arbitrary and disproportionate",
          "Balanced regulation with protection of livelihoods",
          "Imposed conditions to prevent exploitation of dancers",
          "Applied the doctrine of proportionality in regulatory measures"
        ],
        related_cases: [
          "State of Maharashtra v. Indian Hotel & Restaurant Association (2013)",
          "Anuj Garg v. Hotel Association of India (2007)"
        ]
      }
    ];

    // Check if cases already exist
    const { data: existingCases, error: countError } = await supabase
      .from('cases')
      .select('id');
    
    if (countError) {
      throw countError;
    }

    if (existingCases && existingCases.length > 0) {
      return new Response(
        JSON.stringify({ message: 'Database already seeded with cases', count: existingCases.length }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Insert cases
    const { data, error } = await supabase
      .from('cases')
      .insert(cases)
      .select();
    
    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({ 
        message: 'Database seeded successfully', 
        count: data ? data.length : 0 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Seeding error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
