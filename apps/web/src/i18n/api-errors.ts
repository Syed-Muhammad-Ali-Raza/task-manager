import type { Locale } from "@/i18n/config";

export type ApiErrorKey =
  | "unauthorized"
  | "apiError"
  | "uploadFailed"
  | "couldNotSignIn"
  | "couldNotJoin";

export const apiErrors: Record<Locale, Record<ApiErrorKey, string>> = {
  en: {
    unauthorized: "Unauthorized",
    apiError: "API error",
    uploadFailed: "Upload failed",
    couldNotSignIn: "Could not sign in",
    couldNotJoin: "Could not join",
  },
  ru: {
    unauthorized: "Не авторизован",
    apiError: "Ошибка API",
    uploadFailed: "Не удалось загрузить файл",
    couldNotSignIn: "Не удалось войти",
    couldNotJoin: "Не удалось присоединиться",
  },
  es: {
    unauthorized: "No autorizado",
    apiError: "Error de API",
    uploadFailed: "Error al subir",
    couldNotSignIn: "No se pudo iniciar sesión",
    couldNotJoin: "No se pudo unir",
  },
  ar: {
    unauthorized: "غير مصرّح",
    apiError: "خطأ في API",
    uploadFailed: "فشل الرفع",
    couldNotSignIn: "تعذّر تسجيل الدخول",
    couldNotJoin: "تعذّر الانضمام",
  },
  hi: {
    unauthorized: "अनधिकृत",
    apiError: "API त्रुटि",
    uploadFailed: "अपलोड विफल रहा",
    couldNotSignIn: "साइन इन नहीं हो सका",
    couldNotJoin: "जुड़ नहीं सके",
  },
  fr: {
    unauthorized: "Non autorisé",
    apiError: "Erreur de l'API",
    uploadFailed: "Échec du téléversement",
    couldNotSignIn: "Impossible de se connecter",
    couldNotJoin: "Impossible de rejoindre",
  },
  de: {
    unauthorized: "Nicht autorisiert",
    apiError: "API-Fehler",
    uploadFailed: "Upload fehlgeschlagen",
    couldNotSignIn: "Anmeldung fehlgeschlagen",
    couldNotJoin: "Beitritt fehlgeschlagen",
  },
};
