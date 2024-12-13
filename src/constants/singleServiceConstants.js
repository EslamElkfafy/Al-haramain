import ArrowAppointmentEnglishIcon from "@/assets/arrow-appointment-right.svg";
import ArrowAppointmentArabicIcon from "@/assets/arrow-appointment-left.svg";


export const heroInfo = {
    title: {
        en: "Single Service",
        ar: "خدمة فردية"
    },
    description: {
        en: "Home / Services /Single Servesice",
        ar: "الصفحة الرئيسية / الخدمات / خدمة فردية"
    },

}
export const breakpoints = [
    {
      minWidth: 1681,
      columns: 5,
    },
    {
        minWidth: 1392,
        columns: 4,
    },
    {
        minWidth: 1103,
        columns: 3,
    },
    {
        minWidth: 814,
        columns: 2,
    }
  ];

export const appointment = {
    en: {
        title: "Get a appointment with our Expert",
        description: "Fill out the form below to schedule an appointment with our team",
        Icon: ArrowAppointmentEnglishIcon
    }, 
    ar: {
        title: "احصل على موعد مع خبيرنا",
        description: "الرجاء مل الاستمارة أدناه لتقوم بالحجز مع فريقنا",
        Icon: ArrowAppointmentArabicIcon
    }
}