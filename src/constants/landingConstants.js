import HeroImg1 from "@/assets/heroLanding1.webp";
import HeroImg2 from "@/assets/heroLanding2.webp";
import HeroImg3 from "@/assets/heroLanding3.webp";
// FeatureIconns
import Feature1 from "@/assets/feature1.svg";
import Feature2 from "@/assets/feature2.svg";
import Feature3 from "@/assets/feature3.svg";
// ServiceIcons
import Service1 from "@/assets/service1.svg";
import Service2 from "@/assets/service2.svg";
import Service3 from "@/assets/service3.svg";
import Service4 from "@/assets/service4.svg";
import Service5 from "@/assets/service5.svg";
import Service6 from "@/assets/service6.svg";
// infoCardsImgs
import InfoCardImg1 from "@/assets/info-card1.png";
import InfoCardImg2 from "@/assets/info-card2.png";
import InfoCardImg3 from "@/assets/info-card3.png";
import InfoCardImg4 from "@/assets/info-card4.png";

import LongArrowRight from "@/assets/long-arrow-right.png";
import LongArrowLeft from "@/assets/long-arrow-left.png";
import QuoteIcon1 from "@/assets/quote-1.svg";
import QuoteIcon2 from "@/assets/quote-2.svg";
import QuoteIcon3 from "@/assets/quote-3.svg";


export const dataOfHeroes = [
  {
    urlImg: HeroImg1,
    title: {
      en: "Building things is our mission.",
      ar: "نُساهم في بناء المستقبل بخبرة تمتد لعقود.",
    },
    description: {
      en: "The National University of Architecture",
      ar: "اﻟﺠﺎﻣﻌﺔ اﻟﻮﻃﻨﻴﺔ ﻟﻠﻬﻨﺪﺳﺔ اﻟﻤﻌﻤﺎرﻳﺔ",
    },
  },
  {
    urlImg: HeroImg2,
    title: {
      en: "Innovating is at the heart of what we do.",
      ar: "الابتكار هو جوهر ما نقوم به.",
    },
    description: {
      en: "Creative Architecture",
      ar: "الهندسة المعمارية الإبداعية",
    },
  },
  {
    urlImg: HeroImg3,
    title: {
      en: "Building a better world is our vision.",
      ar: "بناء عالم أفضل هو رؤيتنا.",
    },
    description: { en: "Modern Metropolis", ar: "المدينة الحضرية الحديثة" },
  },
];
export const features = [
  {
    title: { en: "Best Services", ar: "أسعار ﺗﻨﺎﻓﺴﻴﺔ" },
    description: {
      en: "Al Haramain Company offers competitive prices for its metal construction services, making it an affordable option for customers.",
      ar: "تُقدّم شركة لاحرميّن أسعارًا تنافسية لخدماتها في مجال البناء المعماري، مما يجعلها خيارًا ميسور التكلفة للعملاء.",
    },
    Icon: Feature1,
  },
  {
    title: { en: "Best Designs", ar: "معدّات حديثة" },
    description: {
      en: "Al Haramain Company uses modern technology and advanced processes to ensure efficient production and timely delivery of products.",
      ar: "تستخدم شركة الحرمين التكنولوجيا الحديثة والعمليات المتقدمة لضمان إنتاج فعال وتسليم منتجات في الوقت المناسب",
    },
    Icon: Feature2,
  },
  {
    title: { en: "Best Teams", ar: "الخبرة" },
    description: {
      en: "The company was founded in 1992 and has built a reputation for providing high quality products and excellent customer service.",
      ar: "تأسست الشركة في عام 2000 واكتسبت سمعة طيبة في تقديم منتجات عالية الجودة وخدمة عملاء ممتازة.",
    },
    Icon: Feature3,
  },
];
export const services = [
  {
    Icon: Service1,
    text: { en: "Metal Fabrication", ar: "تصنيع المعادن" },
  },
  {
    Icon: Service2,
    text: { en: "Steel Erection", ar: "تركيب الفولاذ" },
  },
  {
    Icon: Service3,
    text: { en: "Welding Services", ar: "خدمات اللحام" },
  },
  {
    Icon: Service4,
    text: { en: "Maintenance & Repairs", ar: "صيانة & الإصلاحات" },
  },
  {
    Icon: Service5,
    text: { en: "Structural Design", ar: "التصميم الهيكلي" },
  },
  {
    Icon: Service6,
    text: { en: "Project Management", ar: "إدارة المشاريع" },
  },
];
export const infoCards = [
  {
    urlImg: InfoCardImg1,
    text: { en: "Happy Clients", ar: "ﻋﻤﻠﺎء ﺳﻌﺪاء" },
    number: 84,
    positionClass: "top-0 right-0",
    positionIconClass: "top-0 right-0 translate-x-1/2 -translate-y-1/2",
  },
  {
    urlImg: InfoCardImg2,
    text: { en: "Projects Completed", ar: "اﻟﻤﺸﺎرﻳﻊ اﻟﻤﻨﺠﺰة" },
    number: 123,
    positionClass: "left-0 top-28",
    positionIconClass: "-left-6 -top-6 -translate-x-1/2 -translate-y-1/2",
  },
  {
    urlImg: InfoCardImg3,
    text: { en: "Awards Win", ar: "ﺟﻮاﺋﺰ اﻟﻔﻮز" },
    number: 37,
    positionClass: "top-[14.625rem] right-14",
    positionIconClass: "top-0 right-0 translate-x-1/2 -translate-y-1/2",
  },
  {
    urlImg: InfoCardImg4,
    text: { en: "Years in Business", ar: "سنوات في العمل" },
    number: 24,
    positionClass: "top-[22.3125rem] left-14",
    positionIconClass: "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
  },
];
export const breakpoints = [
  {
    minWidth: 1757,
    columns: 3,
  },
  {
    minWidth: 1341,
    columns: 2,
  },
];
export const aboutInfo = {
  title: {
    en: "About us",
    ar: "معلومات عنا",
  },
  description: {
    en: [
      "Founded in 2000, Al-Haramain Steel has become a leading company in metal construction in Egypt.",
      "The company has played a key role in the development of industrial areas such as Sadat City, 6th of October, and 10th of Ramadan, as well as in the urban growth of cities like New Alamein, Ain Sokhna, New Cairo, Aswan, Toshka, and Shebin El Kom.",
    ],
    ar: [
      "تأسست شركة الحرمين للصلب عام 2000 وأصبحت شركة رائدة في مجال الإنشاءات المعدنية في مصر. ",
      "ولعبت الشركة دوراً رئيسياً في تطوير المناطق الصناعية مثل مدينة السادات والسادس من أكتوبر والعاشر من رمضان، وكذلك في النمو الحضري لمدن مثل العلمين الجديدة والعين السخنة والقاهرة الجديدة وأسوان وتوشكا وشبين الكوم.",
    ],
  },
  textButton: {
    en: "Download our Brochure",
    ar: "قم بتنزيل كتيبنا",
  },
};
export const experinceInfo = {
  title: {
    en: "24 Years Experience",
    ar: "24 سنة من الخبرة",
  },
  description: {
    en: "Our company has been the leading provided construction services to clients throughout the Egypt since 2000.",
    ar: "شركتنا هي الشركة الرائدة في تقديم خدمات البناء للعملاء في جميع أنحاء مصر منذ عام 2000.",
  },
  textButton: {
    en: "Contact Us",
    ar: "اﺗﺼﻞ ﺑﻨﺎ",
  },
};
export const consultationInfo = {
  title: {
    en: "Free consultation with exceptional quality",
    ar: "استشارة مجانية بجودة استثنائية",
  },
  description: {
    en: "Just one call away: ",
    ar: "مكالمة واحدة فقط: ",
  },
  textButton: {
    en: "Get your consultation",
    ar: "اﺣﺼﻞ ﻋﻠﻰ اﺳﺘﺸﺎرﺗﻚ",
  },
}
export const requestInfo = {
  title1: {
      en: "Appointment",
      ar: "ميعاد",
  },
  title2: {
      en: "Request a Quote",
      ar: "طلب عرض أسعار",
  },
  form: {
      fullName: {
          en: "Full Name",
          ar: "الاسم الكامل"
      },
      email: {
          en: "E - Mail",
          ar: "بريد إلكتروني"
      },
      phoneNumber: {
          en: "Phone Number",
          ar: "رقم التليفون"
      },
      service: {
          en: "Select Service",
          ar: "اختر الخدمة"
      },
      message: {
          en: "Message",
          ar: "رسالة"
      }
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
}

export const detailsInfo = [
  {
      title: {
          en: "High Quality Build",
          ar: "بناء عالي الجودة",
      },
      description: {
          en: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          ar: "لوريم إيبسوم هو ببساطة نص شكلي بديل للنص الأصلي. صناعة الطباعة والتنضيد.",
      },
      Icon: QuoteIcon1
  },
  {
      title: {
          en: "High Quality Build",
          ar: "بناء عالي الجودة",
      },
      description: {
          en: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          ar: "لوريم إيبسوم هو ببساطة نص شكلي بديل للنص الأصلي. صناعة الطباعة والتنضيد.",
      },
      Icon: QuoteIcon2
  },
  {
      title: {
          en: "High Quality Build",
          ar: "بناء عالي الجودة"
      },
      description: {
          en: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          ar: "لوريم إيبسوم هو ببساطة نص شكلي بديل للنص الأصلي. صناعة الطباعة والتنضيد.",
      }, 
      Icon: QuoteIcon3
  }
]