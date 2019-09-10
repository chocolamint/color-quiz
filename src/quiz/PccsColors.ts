const allColors = [

    // v
    { pccsCode: "v2", hexCode: "#cd1f42" },
    { pccsCode: "v4", hexCode: "#e55125" },
    { pccsCode: "v6", hexCode: "#f29500" },
    { pccsCode: "v8", hexCode: "#e2c500" },
    { pccsCode: "v10", hexCode: "#a4b300" },
    { pccsCode: "v12", hexCode: "#009a55" },
    { pccsCode: "v14", hexCode: "#007e77" },
    { pccsCode: "v16", hexCode: "#006b93" },
    { pccsCode: "v18", hexCode: "#00569c" },
    { pccsCode: "v20", hexCode: "#474798" },
    { pccsCode: "v22", hexCode: "#793580" },
    { pccsCode: "v24", hexCode: "#ab2664" },

    // b
    { pccsCode: "b2", hexCode: "#f15d69" },
    { pccsCode: "b4", hexCode: "#f7774d" },
    { pccsCode: "b6", hexCode: "#fba52f" },
    { pccsCode: "b8", hexCode: "#f2d324" },
    { pccsCode: "b10", hexCode: "#b7bf19" },
    { pccsCode: "b12", hexCode: "#00b275" },
    { pccsCode: "b14", hexCode: "#00a39b" },
    { pccsCode: "b16", hexCode: "#008fb3" },
    { pccsCode: "b18", hexCode: "#1979ba" },
    { pccsCode: "b20", hexCode: "#716bb6" },
    { pccsCode: "b22", hexCode: "#9c5da0" },
    { pccsCode: "b24", hexCode: "#cc5c87" },

    // dp
    { pccsCode: "dp2", hexCode: "#9f1b34" },
    { pccsCode: "dp4", hexCode: "#a53b1b" },
    { pccsCode: "dp6", hexCode: "#aa6600" },
    { pccsCode: "dp8", hexCode: "#a48f00" },
    { pccsCode: "dp10", hexCode: "#717d00" },
    { pccsCode: "dp12", hexCode: "#006f3e" },
    { pccsCode: "dp14", hexCode: "#00625c" },
    { pccsCode: "dp16", hexCode: "#00526f" },
    { pccsCode: "dp18", hexCode: "#004075" },
    { pccsCode: "dp20", hexCode: "#343472" },
    { pccsCode: "dp22", hexCode: "#5a265f" },
    { pccsCode: "dp24", hexCode: "#811f4c" },

    // lt
    { pccsCode: "lt2", hexCode: "#f59fa0" },
    { pccsCode: "lt4", hexCode: "#ffb195" },
    { pccsCode: "lt6", hexCode: "#ffc887" },
    { pccsCode: "lt8", hexCode: "#f9e08a" },
    { pccsCode: "lt10", hexCode: "#d9d784" },
    { pccsCode: "lt12", hexCode: "#8dd3ad" },
    { pccsCode: "lt14", hexCode: "#71c5be" },
    { pccsCode: "lt16", hexCode: "#71b1c7" },
    { pccsCode: "lt18", hexCode: "#7e9dc3" },
    { pccsCode: "lt20", hexCode: "#9c95c1" },
    { pccsCode: "lt22", hexCode: "#b48fb5" },
    { pccsCode: "lt24", hexCode: "#d995ac" },

    // sf
    { pccsCode: "sf2", hexCode: "#c8787a" },
    { pccsCode: "sf4", hexCode: "#d5896f" },
    { pccsCode: "sf6", hexCode: "#d59f62" },
    { pccsCode: "sf8", hexCode: "#ccb664" },
    { pccsCode: "sf10", hexCode: "#aead5f" },
    { pccsCode: "sf12", hexCode: "#66a986" },
    { pccsCode: "sf14", hexCode: "#499b95" },
    { pccsCode: "sf16", hexCode: "#498a9e" },
    { pccsCode: "sf18", hexCode: "#58779a" },
    { pccsCode: "sf20", hexCode: "#756f99" },
    { pccsCode: "sf22", hexCode: "#8b698d" },
    { pccsCode: "sf24", hexCode: "#ae6f85" },

    // d
    { pccsCode: "d2", hexCode: "#9d5456" },
    { pccsCode: "d4", hexCode: "#a9634c" },
    { pccsCode: "d6", hexCode: "#a9783f" },
    { pccsCode: "d8", hexCode: "#a18e40" },
    { pccsCode: "d10", hexCode: "#85863c" },
    { pccsCode: "d12", hexCode: "#418261" },
    { pccsCode: "d14", hexCode: "#1c7570" },
    { pccsCode: "d16", hexCode: "#1f6578" },
    { pccsCode: "d18", hexCode: "#345474" },
    { pccsCode: "d20", hexCode: "#514d72" },
    { pccsCode: "d22", hexCode: "#664768" },
    { pccsCode: "d24", hexCode: "#854c60" },

    // dk
    { pccsCode: "dk2", hexCode: "#642a2e" },
    { pccsCode: "dk4", hexCode: "#6f3826" },
    { pccsCode: "dk6", hexCode: "#704b1a" },
    { pccsCode: "dk8", hexCode: "#6b5e1b" },
    { pccsCode: "dk10", hexCode: "#535617" },
    { pccsCode: "dk12", hexCode: "#185138" },
    { pccsCode: "dk14", hexCode: "#004542" },
    { pccsCode: "dk16", hexCode: "#004252" },
    { pccsCode: "dk18", hexCode: "#14344e" },
    { pccsCode: "dk20", hexCode: "#312e4d" },
    { pccsCode: "dk22", hexCode: "#422944" },
    { pccsCode: "dk24", hexCode: "#5d2d3f" },

    // p
    { pccsCode: "p2", hexCode: "#e8cbcb" },
    { pccsCode: "p4", hexCode: "#e8ccc3" },
    { pccsCode: "p6", hexCode: "#f3ddc9" },
    { pccsCode: "p8", hexCode: "#ebe0c4" },
    { pccsCode: "p10", hexCode: "#e5e2c4" },
    { pccsCode: "p12", hexCode: "#bdd9c9" },
    { pccsCode: "p14", hexCode: "#b9d8d5" },
    { pccsCode: "p16", hexCode: "#bed6df" },
    { pccsCode: "p18", hexCode: "#bac4d3" },
    { pccsCode: "p20", hexCode: "#c5c2d3" },
    { pccsCode: "p22", hexCode: "#cebfce" },
    { pccsCode: "p24", hexCode: "#e4ccd3" },

    // ltg
    { pccsCode: "ltg2", hexCode: "#bda2a2" },
    { pccsCode: "ltg4", hexCode: "#bda39a" },
    { pccsCode: "ltg6", hexCode: "#c7b3a0" },
    { pccsCode: "ltg8", hexCode: "#c0b69b" },
    { pccsCode: "ltg10", hexCode: "#bab89b" },
    { pccsCode: "ltg12", hexCode: "#95afa0" },
    { pccsCode: "ltg14", hexCode: "#90aeab" },
    { pccsCode: "ltg16", hexCode: "#95acb5" },
    { pccsCode: "ltg18", hexCode: "#929caa" },
    { pccsCode: "ltg20", hexCode: "#9c99a9" },
    { pccsCode: "ltg22", hexCode: "#a497a4" },
    { pccsCode: "ltg24", hexCode: "#b9a3aa" },

    // g
    { pccsCode: "g2", hexCode: "#6f5858" },
    { pccsCode: "g4", hexCode: "#6f5951" },
    { pccsCode: "g6", hexCode: "#776656" },
    { pccsCode: "g8", hexCode: "#716951" },
    { pccsCode: "g10", hexCode: "#6c6a51" },
    { pccsCode: "g12", hexCode: "#576e61" },
    { pccsCode: "g14", hexCode: "#536e6c" },
    { pccsCode: "g16", hexCode: "#4c6068" },
    { pccsCode: "g18", hexCode: "#4a525e" },
    { pccsCode: "g20", hexCode: "#52505e" },
    { pccsCode: "g22", hexCode: "#5a4e5a" },
    { pccsCode: "g24", hexCode: "#6c585e" },

    // dkg
    { pccsCode: "dkg2", hexCode: "#3d2f2f" },
    { pccsCode: "dkg4", hexCode: "#3d2f2b" },
    { pccsCode: "dkg6", hexCode: "#463b30" },
    { pccsCode: "dkg8", hexCode: "#423c2d" },
    { pccsCode: "dkg10", hexCode: "#3e3d2d" },
    { pccsCode: "dkg12", hexCode: "#27362e" },
    { pccsCode: "dkg14", hexCode: "#253634" },
    { pccsCode: "dkg16", hexCode: "#273439" },
    { pccsCode: "dkg18", hexCode: "#242931" },
    { pccsCode: "dkg20", hexCode: "#292830" },
    { pccsCode: "dkg22", hexCode: "#2e272e" },
    { pccsCode: "dkg24", hexCode: "#3c2f33" },

    { pccsCode: "W", hexCode: "#efefef" },
    { pccsCode: "Gy-8.5", hexCode: "#d2d2d2" },
    { pccsCode: "Gy-7.5", hexCode: "#b6b6b6" },
    { pccsCode: "Gy-6.5", hexCode: "#9b9b9b" },
    { pccsCode: "Gy-5.5", hexCode: "#818181" },
    { pccsCode: "Gy-4.5", hexCode: "#696969" },
    { pccsCode: "Gy-3.5", hexCode: "#525252" },
    { pccsCode: "Gy-2.5", hexCode: "#3c3c3c" },
    { pccsCode: "B", hexCode: "#292929" },
] as const;
export type PccsColor = typeof allColors[number];

const tones = ["v", "b", "dp", "lt", "sf", "d", "dk", "p", "ltg", "g", "dkg"] as const;
export type Tone = typeof tones[number];

const hueNumbers = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24] as const;
export type HueNumber = typeof hueNumbers[number];

const regexp = new RegExp(`^(${tones.join('|')})(${hueNumbers.join('|')})$`);
const pccsCodeToColor = new Map<string, PccsColor>(
    allColors.map(color => ({ color, match: regexp.exec(color.pccsCode) }))
        .filter(x => x.match != null) // except W, Gy, B
        .map(x => [x.match![1] + x.match![2], x.color])
);

export const Pccs = {
    get colors() {
        return allColors;
    },
    get tones() {
        return tones;
    },
    get hueNumbers() {
        return hueNumbers;
    },
    complex(h: HueNumber) {
        return (h > 12 ? h - 12 : h + 12) as HueNumber
    },
    find(tone: Tone, hueNumber: HueNumber) {
        const c = pccsCodeToColor.get(tone + hueNumber);
        if (c == null) throw Error(`${tone}${hueNumber} not found.`);
        return c;
    },
    deconstruct(pccsCode: string) {
        const match = regexp.exec(pccsCode);
        if (match == null) throw Error(`${pccsCode} is invalid.`);
        return { tone: match[1], hueNumber: Number(match[2]) };
    },
};

