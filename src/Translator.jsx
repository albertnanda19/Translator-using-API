import React, { useState } from 'react'

const countries = {
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "en-GB": "English",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu"
}

const Translator = () => {
    const [fromText, setFromText] = useState('');
    const [toText, setToText] = useState('');
    const [fromLanguange, setFromLanguange] = useState('en-GB');
    const [toLanguange, setToLanguange] = useState('id-ID');

    // Menukar Bahasa 
    const handleExchange = () => {
        const tempText = fromText;
        const tempLang = fromLanguange;
        setFromText(toText);
        setFromLanguange(toLanguange);
        setToText(tempText);
        setToLanguange(tempLang);
    };

    // Translate
    const handleTranslate = () => {
        if (!fromText.trim()) return;

        setToText('Sedang mentranslate...');

        const apiURL = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
            fromText
        )}&langpair=${fromLanguange}|${toLanguange}`;

        fetch(apiURL)
            .then((res) => res.json())
            .then((data) => {
                const translatedText = data?.responseData?.translatedText || 'Translation not available';
                setToText(translatedText);
            });
    };

    // Teks menjadi suara
    const handleTextToSpeech = (targetId) => {
        const textToSpeech = targetId === 'from' ? fromText : toText;
        const languange = targetId === 'from' ? fromLanguange : toLanguange;

        if (textToSpeech) {
            const utterance = new SpeechSynthesisUtterance(textToSpeech);
            utterance.lang = languange;
            speechSynthesis.speak(utterance);
        }
    };

    // Copy Text
    const handleCopyText = (targetId) => {
        const textToCopy = targetId === 'from' ? fromText : toText;
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy);
        }
    };

    return (
        <div className='flex justify-center items-center px-3 min-h-screen'>
            <div className='max-w-2xl w-full md:p-7 m-8 bg-white rounded-lg p-4 flex flex-col'>
                <div className='rounded-lg border-2 border-gray-500'>
                    <div className='flex md:flex-row flex-col border-b border-gray-700  '>
                        <textarea spellCheck="false" placeholder='Masukkan Text' value={fromText} onChange={(e) => setFromText(e.target.value)} className='border border-gray-700 rounded-tl-lg' ></textarea>
                        <textarea spellCheck="false" readOnly disabled placeholder='Hasil Translate' value={toText} className='border border-gray-700 rounded-tr-lg' ></textarea>
                    </div>
                    <div className='flex flex-row justify-center items-center py-3 '>
                        <div className='flex md:flex-row flex-col-reverse md:gap-0 gap-2 md:justify-center md:items-center'>
                            <div className='flex items-center justify-between w-[38%] md:px-4 md:pl-4 pl-6 md:gap-0 gap-6 md:border-r-2 border-gray-300'>
                                <i className='fas fa-volume-up ' onClick={() => handleTextToSpeech('from')}></i>
                                <i className='fas fa-copy ' onClick={() => handleCopyText('from')} ></i>
                            </div>
                            <div className='md:pl-8 pl-4'>
                                <select value={fromLanguange} onChange={(e) => setFromLanguange(e.target.value)} className='text-gray-800 outline-none border-none md:text-lg text-sm bg-none cursor-pointer ' >
                                    {Object.keys(countries).map((code) => (
                                        <option key={code} value={code}>
                                            {countries[code]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='px-1'>
                            <i class="fa fa-exchange-alt" aria-hidden="true" onClick={handleExchange}></i>
                        </div>
                        <div className='flex md:flex-row flex-col md:gap-0 gap-2 md:justify-center md:items-center '>
                            <div className='md:pr-8 pr-4 md:justify-center flex justify-end items-end'>
                                <select value={toLanguange} onChange={(e) => setToLanguange(e.target.value)} className='text-gray-800 outline-none border-none md:text-lg text-sm bg-none cursor-pointer '>
                                    {Object.keys(countries).map((code) => (
                                        <option key={code} value={code}>
                                            {countries[code]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex items-center justify-between w-[38%] md:text- md:px-4 md:pl-4 ml-6 md:gap-0 gap-6 md:border-l-2 border-gray-300'>
                                <i className='fas fa-volume-up ' onClick={() => handleTextToSpeech('to')}></i>
                                <i className='fas fa-copy ' onClick={() => handleCopyText('to')} ></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={handleTranslate} className='w-full p-4 outline-none border-none text-white cursor-pointer mt-5 text-base rounded-lg bg-blue-500' >Translate Teks</button>
                </div>
            </div>
        </div>
        
        
    )
}

export default Translator;
