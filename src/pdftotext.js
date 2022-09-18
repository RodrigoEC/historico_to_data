import { createWorker } from "tesseract.js";

export const extract = async (file, logging) => {
  const worker = createWorker({
    logger: logging,
  });
  await worker.load();
  await worker.loadLanguage("por");
  await worker.initialize("por");
  const {
    data: { text },
  } = await worker.recognize(file);

  await worker.terminate();
  return text;
};

export const extractFeatures = (text) => {
  const myRegex =
    /([0-9]{7})\s(.*?)\s(Obrigatória|Optativa|Extracurricular)\s(\d)\s(\d{2})\s(\d{1,2},\d)\s(Dispensa|Aprovado|Reprovado|Trancado)\s(\d{4}\.\d)/gim;

  const result = text.matchAll(myRegex);
  console.log(result);
  let finalResult = [];

  for (const regex of result) {
    finalResult.push({
      id: regex[1],
      class: formatClassName(regex[2]),
      type: regex[3],
      status: regex[7],
    });
  }

  return finalResult;
};

export const formatClassName = (name) => {
  const replaceObject = {
    "— ": "",
    "- ": "",
    "|l": "II",
    "|": "I",
    ". ": "",
  };
  let formattedName = name;

  Object.keys(replaceObject).map(
    (string) =>
      (formattedName = formattedName.replace(string, replaceObject[string]))
  );

  return formattedName;
};
