import React from "react";
import "./GraphicWork.scss";

import image from "../../../assets/Services/Graphic/graphic/9 to 69.png";
import Damru from "../../../assets/Services/Graphic/graphic/Damru.png";
import crksons from "../../../assets/Services/Graphic/graphic/C.R.Kothari & Sons.png";
import DCI from "../../../assets/Services/Graphic/graphic/DCI.png";
import Devkrupa from "../../../assets/Services/Graphic/graphic/Devkrupa corporation.png";
import Dhruv from "../../../assets/Services/Graphic/graphic/Dhruv E.png";
import faithline from "../../../assets/Services/Graphic/graphic/faithline.png";
import JK from "../../../assets/Services/Graphic/graphic/JK.png";
import Lemontree from "../../../assets/Services/Graphic/graphic/Lemontree.png";
import Marcost from "../../../assets/Services/Graphic/graphic/Marcost.png";
import MeinMusafir from "../../../assets/Services/Graphic/graphic/Mein Musafir.png";
import MTM from "../../../assets/Services/Graphic/graphic/MTM Store.png";
import Neshaytech from "../../../assets/Services/Graphic/graphic/Neshaytech.png";
import Nikunj from "../../../assets/Services/Graphic/graphic/Nikunj Koladia.png";
import Parth from "../../../assets/Services/Graphic/graphic/Parth E.png";
import Pidilite from "../../../assets/Services/Graphic/graphic/Pidilite.png";
import Pragmatic from "../../../assets/Services/Graphic/graphic/Pragmatic Treasure.png";
import Praytnaa from "../../../assets/Services/Graphic/graphic/Praytnaa Education.png";
import SCSmart from "../../../assets/Services/Graphic/graphic/SC Smart Class.png";
import Schreett from "../../../assets/Services/Graphic/graphic/Schreett.png";
import Sunshine from "../../../assets/Services/Graphic/graphic/Sunshine.png";
import Thebigday from "../../../assets/Services/Graphic/graphic/Thebigday.png";
import TransOceanic from "../../../assets/Services/Graphic/graphic/Trans Oceanic.png";
import Unicrop from "../../../assets/Services/Graphic/graphic/Unicrop Biochem.png";
import Vivekanand from "../../../assets/Services/Graphic/graphic/Vivekanand.png";
import Vrajdev from "../../../assets/Services/Graphic/graphic/Schreett.png";
import viseorganic from "../../../assets/Services/Graphic/graphic/vise organic.png";
import agroniv from "../../../assets/Services/Graphic/graphic/agroniv.png";
import AnzelRidez from "../../../assets/Services/Graphic/graphic/Anzel Ridez.png";
import biowave from "../../../assets/Services/Graphic/graphic/biowave.png";

import jass from "../../../assets/Services/Graphic/graphic/jass.png";
import satvsar from "../../../assets/Services/Graphic/graphic/satvsar.png";
import ferrotube from "../../../assets/Services/Graphic/graphic/ferrotube.png";
import gemsparx from "../../../assets/Services/Graphic/graphic/gemsparx.png";
import elements from "../../../assets/Services/Graphic/graphic/elements.png";
import infinimade from "../../../assets/Services/Graphic/graphic/infinitymad.png";
import glemour from "../../../assets/Services/Graphic/graphic/glamour.png";

const mainRows = [
    [
        { name: "Anzel Ridez", logo: AnzelRidez },
        { name: "Pidilite", logo: Pidilite },
        { name: "9 to 69", logo: image },
    ],
    [
        { name: "Marcost", logo: Marcost },
        { name: "CRK & sons", logo: crksons },
        { name: "JK Creation", logo: JK },
    ],
    [
        { name: "Divine", logo: DCI },
        { name: "Vivekanand", logo: Vivekanand },
        { name: "Dhruv Enterprise", logo: Dhruv },
    ],
    [
        { name: "Satvsar", logo: satvsar },
        { name: "FerroTube", logo: ferrotube },
        { name: "Jass Perfumes", logo: jass },
    ],
    [
        { name: "Biowave", logo: biowave },
        { name: "Mein Musafir", logo: MeinMusafir },
        { name: "Lemon Tree", logo: Lemontree },
    ],
    [
        { name: "Sunshine", logo: Sunshine },
        { name: "Thebigday", logo: Thebigday },
        { name: "Trans Oceanic", logo: TransOceanic },
    ],
    [
        { name: "Damru", logo: Damru },
        { name: "Faithline", logo: faithline },
        { name: "Unicrop Biochem", logo: Unicrop },
    ],
    [{ name: "Glamour", logo: glemour }],
];

const floatingCards = [
    { name: "Neshaytech", side: "left", row: 0, logo: Neshaytech },
    { name: "Agroniv", side: "right", row: 0, logo: agroniv },
    { name: "Parth Enterprise", side: "left", row: 1, logo: Parth },
    { name: "MTM Store", side: "right", row: 1, logo: MTM },
    { name: "Pragmatic Treasure", side: "left", row: 2, logo: Pragmatic },
    { name: "Praytnaa Education", side: "right", row: 2, logo: Praytnaa },
    { name: "SC Smart Class", side: "left", row: 3, logo: SCSmart },
    { name: "Schreett", side: "right", row: 3, logo: Schreett },
    { name: "Nikunj Koladia", side: "left", row: 4, logo: Nikunj },
    { name: "Devkrupa", side: "right", row: 4, logo: Devkrupa },
    { name: "Vrajdev Mobility", side: "left", row: 5, logo: Vrajdev },
    { name: "Infinimed", side: "right", row: 5, logo: infinimade },
    { name: "Gemsparx", side: "left", row: 6, logo: gemsparx },
    { name: "Elements", side: "right", row: 6, logo: elements },
];

const rowHeight = 300;
const cardWidth = 220;
const cardHeight = 260;
const horizontalSpacing = 250;
const floatOffset = 250;

const glowPositions = Object.fromEntries(
    [
        "9 to 69",
        "Agroniv",
        "Anzel Ridez",
        "Biowave",
        "CRK & sons",
        "Damru",
        "Divine",
        "Devkrupa",
        "Dhruv Enterprise",
        "Faithline",
        "JK Creation",
        "Lemon Tree",
        "Marcost",
        "Mein Musafir",
        "MTM Store",
        "Sunshine",
        "Thebigday",
        "Trans Oceanic",
        "Neshaytech",
        "Nikunj Koladia",
        "Parth Enterprise",
        "Pidilite",
        "Pragmatic Treasure",
        "Praytnaa Education",
        "SC Smart Class",
        "Schreett",
        "Unicrop Biochem",
        "Vivekanand",
        "Vrajdev Mobility",
        "vise organic",
    ].map((name) => [name, ["50%", "50%"]])
);

const GraphicWork = () => {
    const containerCenter = window.innerWidth / 2;

    const handleCardClick = (e) => {
        if (window.innerWidth <= 768) {
            e.currentTarget.classList.toggle("flipped");
        }
    };

    // ✅ Helper function: compute left based on number of columns in the row
    const getLeftForCol = (colIndex, columns) => {
        if (columns === 1) {
            return containerCenter;
        } else if (columns === 2) {
            const half = horizontalSpacing / 2;
            return colIndex === 0 ? containerCenter - half : containerCenter + half;
        } else {
            if (colIndex === 0) return containerCenter - horizontalSpacing;
            if (colIndex === 2) return containerCenter + horizontalSpacing;
            return containerCenter;
        }
    };

    return (
        <div className="graphic-design-wrapper">
            <div className="graphic-header">
                <h2>Graphic Design Work</h2>
                <p className="subtitle">Bold, impactful designs that tell your story.</p>
            </div>

            <section className="graphic-container">
                {/* ✅ Main cards updated with getLeftForCol() */}
                {mainRows.map((row, rowIndex) =>
                    row.map((card, colIndex) => {
                        const left = getLeftForCol(colIndex, row.length);
                        const top = 50 + rowIndex * rowHeight;
                        const [glowX, glowY] = glowPositions[card.name] || ["50%", "50%"];

                        return (
                            <div
                                key={`main-${rowIndex}-${colIndex}`}
                                className="glass-card"
                                onClick={handleCardClick}
                                style={{
                                    top,
                                    left,
                                    width: cardWidth,
                                    height: cardHeight,
                                    "--glow-color": "rgba(155, 81, 224, 0.95)",
                                    "--glow-x": glowX,
                                    "--glow-y": glowY,
                                }}
                            >
                                <div className="glass-card-inner">
                                    <div className="glass-card-front">
                                        <img className="company-logo" src={card.logo} alt={card.name} />
                                    </div>
                                    <div className="glass-card-back">
                                        <h3 className="company-name">{card.name}</h3>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}

                {/* Floating cards */}
                {floatingCards.map((card, index) => {
                    const left =
                        card.side === "left"
                            ? containerCenter - horizontalSpacing - floatOffset
                            : containerCenter + horizontalSpacing + floatOffset;
                    const top = 50 + card.row * rowHeight + rowHeight / 2;
                    const [glowX, glowY] = glowPositions[card.name] || ["50%", "50%"];

                    return (
                        <div
                            key={`float-${index}`}
                            className="glass-card"
                            onClick={handleCardClick}
                            style={{
                                top,
                                left,
                                width: cardWidth,
                                height: cardHeight,
                                "--glow-color": "rgba(255, 255, 255, 0.95)",
                                "--glow-x": glowX,
                                "--glow-y": glowY,
                            }}
                        >
                            <div className="glass-card-inner">
                                <div className="glass-card-front">
                                    <img className="company-logo" src={card.logo} alt={card.name} />
                                </div>
                                <div className="glass-card-back">
                                    <h3 className="company-name">{card.name}</h3>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>
        </div>
    );
};

export default GraphicWork;
