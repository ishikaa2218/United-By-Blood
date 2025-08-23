import React from "react";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={footerContainer}>
        <div style={leftSide}>
          <h3 style={footerTitle}>United By Blood</h3>
          <p style={footerText}>
            Saving lives, one donation at a time.  
            Join us in making a difference today!
          </p>
        </div>
        <div style={rightSide}>
          <div style={linksSection}>
            <h4 style={linksTitle}>Quick Links</h4>
            <ul style={linksList}>
              <li><a href="#about" style={link}>About Us</a></li>
              <li><a href="#campaigns" style={link}>Campaigns</a></li>
              <li><a href="#donate" style={link}>Donate Now</a></li>
              <li><a href="#contact" style={link}>Contact</a></li>
            </ul>
          </div>

          <div style={linksSection}>
            <h4 style={linksTitle}>Donor Related</h4>
            <ul style={linksList}>
              <li><a href="#donate-blood" style={link}>Donate Blood</a></li>
              <li><a href="#donor-registration" style={link}>Donor Registration</a></li>
              <li><a href="#donor-benefits" style={link}>Donor Benefits</a></li>
              <li><a href="#donor-stories" style={link}>Donor Stories</a></li>
            </ul>
          </div>

          <div style={linksSection}>
            <h4 style={linksTitle}>Recipient Related</h4>
            <ul style={linksList}>
              <li><a href="#request-blood" style={link}>Request Blood</a></li>
              <li><a href="#blood-availability" style={link}>Blood Availability</a></li>
              <li><a href="#recipient-stories" style={link}>Recipient Stories</a></li>
              <li><a href="#how-it-works" style={link}>How It Works</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div style={bottomBar}>
        <p style={copyright}>
          © {new Date().getFullYear()} United By Blood. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

const footerStyle: React.CSSProperties = {
  backgroundColor: "#552b2b",
  color: "white",
  paddingTop: "40px",
};

const footerContainer: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 20px",
  flexWrap: "wrap",
  gap: "60px"
};

const leftSide: React.CSSProperties = {
  flex: "1",
  minWidth: "250px",
};

const rightSide: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap", // allow wrapping when screen gets smaller
    gap: "20px", // space between sections
};

const footerTitle: React.CSSProperties = {
  fontSize: "22px",
  marginBottom: "15px",
};

const footerText: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "1.6",
};

const linksTitle: React.CSSProperties = {
  fontSize: "18px",
  marginBottom: "10px",
};

const linksList: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
};

const link: React.CSSProperties = {
  color: "white",
  textDecoration: "none",
  fontSize: "14px",
  marginBottom: "10px", // Vertical spacing between list items
  display: "block", // Make sure the link takes up the full width of the list item
  lineHeight: "2",
};

const linksSection: React.CSSProperties = {
  flex: "1 1 200px",
  minWidth: "250px", // Ensure each section is at least 250px wide
  marginRight: "20px",
};

const bottomBar: React.CSSProperties = {
  textAlign: "center",
  marginTop: "30px",
  padding: "20px",
  borderTop: "1px solid #7a5252",
};

const copyright: React.CSSProperties = {
  fontSize: "13px",
  margin: 0,
};

export default Footer;
