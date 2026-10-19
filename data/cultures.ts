import type { Culture } from "@/types/content";

/**
 * Written to be read by the people described. Have it reviewed by community
 * representatives before launch. Partner names are placeholders.
 */
export const cultures: Culture[] = [
  {
    slug: "owambo",
    name: "Owambo",
    selfName: "Aawambo",
    regions: "North-central Namibia",
    overview: [
      "The Aawambo are Namibia's largest group, made up of several communities with their own histories and dialects, including the Ndonga and the Kwanyama.",
      "Life in the north has long been built around family homesteads, cattle and fields of mahangu (pearl millet). Today it is also home to busy towns and markets.",
    ],
    history:
      "The north was central to the long struggle for independence from South African rule, which came in 1990. Many of the country's leaders since then have come from the region.",
    visitWell: [
      "Visit markets and community-run heritage sites with a local guide.",
      "If you're invited into a homestead, it's a privilege: ask before taking photographs, and follow your host's lead.",
    ],
    partner: { name: "Northern heritage partner (placeholder)", type: "community-run" },
  },
  {
    slug: "herero",
    name: "Herero",
    selfName: "OvaHerero",
    regions: "Central and eastern Namibia",
    overview: [
      "The OvaHerero are a cattle-keeping people whose identity is closely tied to land, ancestry and herds. Herero women's long dresses and horn-shaped headdresses are worn with great pride, especially at commemorations.",
      "Many Herero families farm in the centre and east of the country; others live and work in towns and cities.",
    ],
    history:
      "Between 1904 and 1908, German colonial forces carried out a genocide against the Herero and Nama peoples. Tens of thousands were killed, driven into the desert or died in concentration camps. Germany formally acknowledged the genocide in 2021. Talks with affected communities about recognition and reparations continue, and many feel they have not been properly included.",
    visitWell: [
      "Learn the history before you go. It shapes the country you'll be travelling through.",
      "Commemorations are community events, not shows: attend only if invited, and don't photograph without permission.",
    ],
    partner: { name: "Central Namibia community partner (placeholder)", type: "community-run" },
  },
  {
    slug: "himba",
    name: "Himba",
    selfName: "OvaHimba",
    regions: "Kunene Region, the far north-west",
    overview: [
      "The OvaHimba are semi-pastoralists in the mountains and valleys of the Kunene Region, closely related to the Herero. Cattle and goats are at the heart of family and spiritual life, with herds moved seasonally between grazing areas.",
      "Like everyone, Himba families make their own choices about tradition and change: school, phones, towns and herds all sit side by side.",
    ],
    history:
      "The Himba have kept their way of life through colonial rule, war and drought. In the 1990s and 2000s, communities campaigned against a proposed hydroelectric dam on the Kunene that would have flooded ancestral graves and grazing land.",
    visitWell: [
      "Kaokoland has many informal 'village visits' arranged by outsiders, with sweets or maize as payment. We don't do these.",
      "We only arrange visits through community-run enterprises, with an interpreter from the community and a fee paid to the community.",
      "Ask before every photograph. Accept a no. Never photograph children without their parents' clear consent.",
    ],
    partner: { name: "Kunene community-run enterprise (placeholder)", type: "community-run" },
  },
  {
    slug: "san",
    name: "San",
    selfName: "Ju|'hoansi, Hai||om, !Xun, Khwe and others",
    regions: "The north-east (Nyae Nyae, Bwabwata), around Etosha, and elsewhere",
    overview: [
      "The San are several distinct peoples with their own languages, among them the Ju|'hoansi, Hai||om, !Xun and Khwe. Their ancestors have lived in southern Africa for many thousands of years, and much of the region's rock art is linked to them.",
      "Knowledge of plants, animals and tracking is deep, but San communities are not museum pieces: they are modern people dealing with modern problems.",
    ],
    history:
      "San communities have suffered great dispossession. The Hai||om, for example, were moved out of what became Etosha National Park. Today many San face poverty and discrimination. Community conservancies such as Nyae Nyae, among the first in Namibia, give some communities a measure of control over land and income.",
    visitWell: [
      "Choose experiences owned and run by San communities, where the guides set the programme and keep the income.",
      "Avoid anything that presents people as 'living in the past'.",
    ],
    partner: { name: "North-east conservancy partner (placeholder)", type: "conservancy" },
  },
  {
    slug: "nama",
    name: "Nama",
    regions: "Southern Namibia",
    overview: [
      "The Nama are Khoekhoe-speaking people of the south, with a long tradition of pastoralism, poetry, song and the distinctive Nama stap dance.",
      "Their language, Khoekhoegowab (with its clicks), is shared with the Damara.",
    ],
    history:
      "The Nama resisted German colonial rule, famously under leaders such as Hendrik Witbooi, who now appears on Namibian banknotes. Like the Herero, they were victims of the 1904–1908 genocide.",
    visitWell: [
      "In the south, community campsites and guided walks are often the best way to meet people on equal terms.",
      "Learn a greeting in Khoekhoegowab. It is always appreciated.",
    ],
    partner: { name: "Southern community campsite (placeholder)", type: "community-run" },
  },
  {
    slug: "damara",
    name: "Damara",
    selfName: "ǂNūkhoen",
    regions: "North-west and central Namibia",
    overview: [
      "The Damara, or ǂNūkhoen, are Khoekhoegowab-speaking people with deep roots in the north-west. They have a strong tradition of plant knowledge, metalwork and music.",
      "Much of Damaraland is now managed through community conservancies, where wildlife and tourism bring income to local people.",
    ],
    history:
      "Under colonial and apartheid rule, many Damara were moved into a 'homeland'. Conservancies set up since the late 1990s have helped return some control over land and wildlife.",
    visitWell: [
      "Stay at conservancy lodges, where a share of every night goes to the community.",
      "Use community guides at Twyfelfontein and on elephant tracking.",
    ],
    partner: { name: "Damaraland conservancy (placeholder)", type: "conservancy" },
  },
  {
    slug: "others",
    name: "And many more",
    regions: "Across Namibia",
    overview: [
      "Namibia is home to many other communities: the peoples of the Kavango and Zambezi regions, the Tswana, the Rehoboth Basters, and Namibians of mixed, Afrikaans, German and English heritage, among others.",
      "Over a dozen languages are spoken. English has been the official language since independence, and most Namibians speak several.",
    ],
    history: "Independence in 1990 brought one country together after a century of colonial division. That work continues today.",
    visitWell: ["Ask your guide about their own story: it's often the best conversation of the trip."],
    partner: { name: "Regional partners (placeholder)", type: "cooperative" },
  },
];
