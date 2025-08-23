import React from "react";
import Marquee from "react-fast-marquee";

const InfoMarquee = () => {
  return (
    <div style={{ backgroundColor: "#f8d7da ", padding: "40px 0px" }}>
      <Marquee
        gradient={false}
        speed={20}
      >
        <div style={wrapperStyle}>
          {cardData.map((card, index) => (
            <div key={index} style={cardStyle}>
              <div style={iconStyle}>{card.icon}</div>
              <h3 style={titleStyle}>{card.title}</h3>
              <p style={descStyle}>{card.description}</p>
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

// Card Content
const cardData = [
  {
    icon: "🕒",
    title: "It takes only an hour",
    description: "Donate blood, save lives!",
  },
  {
    icon: "🥤",
    title: "You will get free refreshments after donation",
    description: "Donation of blood is safe and healthy",
  },
  {
    icon: "₹",
    title: "It costs nothing",
    description: "Give blood and stay healthy",
  },
  {
    icon: "🩸",
    title: "There is nothing greater than saving lives",
    description: "Every blood donation can save up to three lives",
  },
];

// Card Wrapper (NEW)
const wrapperStyle: React.CSSProperties = {
  display: "flex",
  gap: "80px", // 🔥 Evenly spaced
  alignItems: "center",
};

// Card
const cardStyle: React.CSSProperties = {
  background: "white",
  borderRadius: "10px",
  width: "300px",
  height: "250px",
  padding: "20px",
  textAlign: "center",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const iconStyle: React.CSSProperties = {
  fontSize: "40px",
  marginBottom: "10px",
};

const titleStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "10px",
};

const descStyle: React.CSSProperties = {
  fontSize: "14px",
  margin: 0,
};

export default InfoMarquee;
