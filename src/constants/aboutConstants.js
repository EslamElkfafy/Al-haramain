import heroAboutImg from "@/assets/hero-about.png";
import Slide1 from "@/assets/about-slide-1.png";
import Slide2 from "@/assets/about-slide-2.png";
import Slide3 from "@/assets/about-slide-3.png";
import Leader1 from "@/assets/leader1.png";
import Leader2 from "@/assets/leader2.png";
import Leader3 from "@/assets/leader3.png";
import Leader4 from "@/assets/leader4.png";
import Leader5 from "@/assets/leader5.png";
import Leader6 from "@/assets/leader6.png";
import Leader7 from "@/assets/leader7.png";
import Leader8 from "@/assets/leader8.png";
import LongArrowRight from "@/assets/long-arrow-right.png";
import LongArrowLeft from "@/assets/long-arrow-left.png";
import QuoteIcon1 from "@/assets/quote-1.svg";
import QuoteIcon2 from "@/assets/quote-2.svg";
import QuoteIcon3 from "@/assets/quote-3.svg";

export const heroInfo = {
  title: {
    en: "About Us",
    ar: "معلومات عنا",
  },
  description: {
    en: "Home / About Us",
    ar: "الرئيسية / نبذة عن الشركه",
  },
  urlImg: heroAboutImg,
};

export const slides = [
  {
    title: { en: "Our Vision", ar: "رؤيتنا" },
    paragraphs: [
      {
        en: "To become the leading provider of innovative and sustainable metal construction solutions in the region, recognized for our excellence in engineering, craftsmanship, and customer service.",
        ar: "أن نصبح المزود الرائد لحلول البناء المعدنية المبتكرة والمستدامة في المنطقة، والمعروفة بتميزنا في الهندسة والحرفية وخدمة العملاء. ",
      },
      {
        en: "We aspire to shape the future of infrastructure by setting new standards in quality, safety, and environmental responsibility, while contributing to the growth and development of thriving industrial and urban communities. ",
        ar: "نحن نطمح إلى صياغة مستقبل البنية التحتية من خلال وضع معايير جديدة للجودة والسلامة والمسؤولية البيئية، مع المساهمة في نمو وتطور المجتمعات الصناعية والحضرية المزدهرة. ",
      },
      {
        en: "Through continuous improvement and a commitment to innovation, we aim to build lasting partnerships and create a lasting impact on the construction industry.",
        ar: "من خلال التحسين المستمر والالتزام بالابتكار، نهدف إلى بناء شراكات دائمة وخلق تأثير دائم على صناعة البناء.",
      },
    ],
    image: {
      src: Slide2,
      alt: { en: "building", ar: "مبني" },
    },
  },
  {
    title: { en: "Our Mission", ar: "رسالتنا " },
    paragraphs: [
      {
        en: "At Al-Haramain Steel, our mission is to be the driving force behind the advancement of the metal construction industry.",
        ar: "في مؤسسة الحرمين للصلب، مهمتنا هي أن نكون القوة الدافعة وراء تقدم صناعة البناء المعدنية.",
      },
      {
        en: "We aim to deliver cutting-edge, durable solutions that support the development of vital industrial zones and urban areas. Through a combination of expert engineering, state-of-the-art technology, and a relentless focus on quality, we strive to exceed client expectations, ensuring the timely and efficient execution of every project.",
        ar: " هدفنا هو تقديم حلول متطورة ودائمة تدعم تطوير المناطق الصناعية الحيوية والمناطق الحضرية. من خلال الجمع بين الهندسة المتخصصة والتكنولوجيا الحديثة والتركيز المستمر على الجودة، فإننا نسعى جاهدين لتجاوز توقعات العملاء، وضمان التنفيذ في الوقت المناسب وبكفاءة لكل مشروع. ",
      },
      {
        en: "Sustainability, innovation, and customer satisfaction are at the core of everything we do, as we work to shape a stronger, more connected future for the communities we serve.",
        ar: "تشكل الاستدامة والابتكار ورضا العملاء جوهر كل ما نقوم به، حيث نعمل على صياغة مستقبل أقوى وأكثر ترابطًا للمجتمعات التي نخدمها.",
      },
    ],
    image: {
      src: Slide1,
      alt: { en: "building", ar: "مبني" },
    },
  },
  {
    title: { en: "Our Goals", ar: "اهدافنا" },
    paragraphs: [
      {
        en: "Provide innovative and comprehensive metal construction solutions that meet our clients' needs.",
        ar: "تقديم حلول مبتكرة وشاملة في مجال الإنشاءات المعدنية تلبي احتياجات عملائنا.",
      },
      {
        en: "Contribute to the development of industrial and urban infrastructure in Egypt.",
        ar: " المساهمة في تطوير البنية التحتية الصناعية والعمرانية في مصر.",
      },
      {
        en: "Achieve the highest standards of quality and safety in all our projects.",
        ar: "تحقيق أعلى معايير الجودة والسلامة في جميع مشاريعنا.",
      },
      {
        en: "Expand in the local and regional markets to strengthen our position as a leading company in the field.",
        ar: "تعزيز الابتكار والاستدامة في مجال الإنشاءات المعدنية.",
      },
      {
        en: "Promote innovation and sustainability in the metal construction industry.",
        ar: "التوسع في السوق المحلي والإقليمي لتعزيز مكانتنا كشركة رائدة في هذا المجال.",
      },
    ],
    image: {
      src: Slide3,
      alt: { en: "building", ar: "مبني" },
    },
  },
];
export const leadersCards = [
  {
    name: "Larry F. Burnett",
    title: "CEO",
    image: {
      src: Leader1,
      alt: "Larry F. Burnett",
    },
  },
  {
    name: "Meghan J. Webb",
    title: "CEO",
    image: {
      src: Leader2,
      alt: "Meghan J. Webb",
    },
  },
  {
    name: "Yvonne J. Cullum",
    title: "CFO",
    image: {
      src: Leader3,
      alt: "Yvonne J. Cullumn",
    },
  },
  {
    name: "Diana H. Williams",
    title: "COO",
    image: {
      src: Leader4,
      alt: "Diana H. Williams",
    },
  },
  {
    name: "Larry F. Burnett",
    title: "CEO",
    image: {
      src: Leader5,
      alt: "Larry F. Burnett",
    },
  },
  {
    name: "Meghan J. Webb",
    title: "CTO",
    image: {
      src: Leader6,
      alt: "Meghan J. Webb",
    },
  },
  {
    name: "Yvonne J. Cullum",
    title: "CFO",
    image: {
      src: Leader7,
      alt: "Yvonne J. Cullum",
    },
  },
  {
    name: "Diana H. Williams",
    title: "COO",
    image: {
      src: Leader8,
      alt: "Diana H. Williams",
    },
  },
];
export const leadersInfo = {
  title1: {
    en: "Team",
    ar: "الفريق",
  },
  title2: {
    en: "Our Leaders",
    ar: "قادتنا",
  },
  leaders: leadersCards,
};

export const headInfo = {
  title1: {
    en: "About US",
    ar: "معلومات عن الشركة",
  },
  title2: {
    en: "We ‘re providing the best customer service",
    ar: "نحن نقدم أفضل خدمة عملاء.",
  },
  paragraphs: [
    {
      en: "Founded in 2000, Al-Haramain Steel has become a leading company in metal construction in Egypt. ",
      ar: "تأسست شركة الحرمين للصلب عام 2000 وأصبحت شركة رائدة في مجال الإنشاءات المعدنية في مصر. ",
    },
    {
      en: "The company has played a key role in the development of industrial areas such as Sadat City, 6th of October, and 10th of Ramadan, as well as in the urban growth of cities like New Alamein, Ain Sokhna, New Cairo, Aswan, Toshka, and Shebin El Kom.",
      ar: "ولعبت الشركة دوراً رئيسياً في تطوير المناطق الصناعية مثل مدينة السادات والسادس من أكتوبر والعاشر من رمضان، وكذلك في النمو الحضري لمدن مثل العلمين الجديدة والعين السخنة والقاهرة الجديدة وأسوان وتوشكا وشبين الكوم.",
    },
  ],
  button: {
    text: {
      en: "Learn more",
      ar: "اقرأ اكثر",
    },
    urlOfIcon: {
      en: LongArrowRight,
      ar: LongArrowLeft,
    },
    altOfIcon: {
        en: "arrow",
        ar: "سهم",
    }
  },
};
export const quoteInfo = {
    title1: {
        en: "Get a Quote",
        ar: "احصل على عرض أسعار",
    },
    title2: {
        en: "Build Your Future Today",
        ar: "ابني مستقبلك اليوم",
    },
    description: {
        en: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
        ar: "Lorem Ipsum هو ببساطة نص شكلي (بمعنى أنه ليس بالضرورة نصًا) يُستخدم في صناعة الطباعة والتنضيد. لقد كان نص لوريم إيبسوم هو النص الوهمي القياسي في الصناعة منذ القرن السادس عشر،"
    },
    button: {
        text: {
            en: "Appointment",
            ar: "ميعاد",
        },
        urlOfIcon: {
            en: LongArrowRight,
            ar: LongArrowLeft,
        },
        altOfIcon: {
            en: "arrow",
            ar: "سهم",
        }
    }
};

export const numbersInfo = [
    {
        title: {
            en: "Our Staff",
            ar: "طاقم العمل لدينا",
        },
        description: {
            en: "+200",
            ar: "+200",
        },
    },  
    {
        title: {
            en:"Production capacity",
            ar: "القدرة الإنتاجية",
        },
        description: {
            en: "+500 tons/month",
            ar: "+500 طن/شهر",
        }
    },
    {
        title: {
            en: "Number and work tools",
            ar: "عدد وأدوات العمل",
        },
        description: {
            en: "+2000",
            ar: "+2000"
        }
    }
]
