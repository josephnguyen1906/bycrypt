import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { getLocalePhones } from "@/services/User.service";

export type LocalePhoneCountry = {
  id: number;
  code: string;
  name: string;
  phoneCode: string;
  img: string;
};

type ApiLocaleRow = {
  id: number;
  code: string;
  name: string;
  phone_code: string;
  flag_url: string;
};

const FALLBACK: LocalePhoneCountry[] = [
  {
    id: 0,
    code: "en",
    name: "English",
    phoneCode: "1",
    img: "https://flagcdn.com/us.svg",
  },
  {
    id: 1,
    code: "vi",
    name: "Tiếng Việt",
    phoneCode: "84",
    img: "https://flagcdn.com/vn.svg",
  },
  {
    id: 2,
    code: "ja",
    name: "日本語",
    phoneCode: "81",
    img: "https://flagcdn.com/jp.svg",
  },
  {
    id: 3,
    code: "id",
    name: "Bahasa Indonesia",
    phoneCode: "62",
    img: "https://flagcdn.com/id.svg",
  },
  {
    id: 4,
    code: "de",
    name: "Deutsch",
    phoneCode: "49",
    img: "https://flagcdn.com/de.svg",
  },
  {
    id: 5,
    code: "es",
    name: "Español",
    phoneCode: "34",
    img: "https://flagcdn.com/es.svg",
  },
  {
    id: 6,
    code: "po",
    name: "Portugal",
    phoneCode: "351",
    img: "https://flagcdn.com/pt.svg",
  },
  {
    id: 7,
    code: "fr",
    name: "Français",
    phoneCode: "33",
    img: "https://flagcdn.com/fr.svg",
  },
  {
    id: 8,
    code: "it",
    name: "Italiano",
    phoneCode: "39",
    img: "https://flagcdn.com/it.svg",
  },
  {
    id: 9,
    code: "ko",
    name: "한국인",
    phoneCode: "82",
    img: "https://flagcdn.com/kr.svg",
  },
  {
    id: 10,
    code: "th",
    name: "ไทย",
    phoneCode: "66",
    img: "https://flagcdn.com/th.svg",
  },
  {
    id: 11,
    code: "gr",
    name: "Ελληνικά",
    phoneCode: "30",
    img: "https://flagcdn.com/gr.svg",
  },
];

function mapRow(row: ApiLocaleRow): LocalePhoneCountry {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    phoneCode: row.phone_code,
    img: row.flag_url,
  };
}

export function useLocalePhoneCountries() {
  const { i18n } = useTranslation();
  const [countries, setCountries] = useState<LocalePhoneCountry[]>(FALLBACK);
  const [selectedCountry, setSelectedCountry] = useState<LocalePhoneCountry>(
    FALLBACK[1],
  );

  useEffect(() => {
    let cancelled = false;
    const locale =
      i18n.language ||
      (typeof window !== "undefined"
        ? window.localStorage.getItem("lang")
        : null) ||
      "vi";

    getLocalePhones(locale)
      .then((res: any) => {
        if (cancelled || res?.status !== true || !res?.data?.locales) {
          return;
        }
        const mapped = (res.data.locales as ApiLocaleRow[]).map(mapRow);
        setCountries(mapped.length ? mapped : FALLBACK);
        if (res.data.default) {
          setSelectedCountry(mapRow(res.data.default as ApiLocaleRow));
        }
      })
      .catch(() => {
        /* ponytail: keep FALLBACK if API unavailable */
      });

    return () => {
      cancelled = true;
    };
  }, [i18n.language]);

  const countrySearchFilter = useMemo(
    () => (query: string) =>
      countries.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [countries],
  );

  return {
    countries,
    selectedCountry,
    setSelectedCountry,
    countrySearchFilter,
  };
}
