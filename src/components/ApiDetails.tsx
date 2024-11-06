import React, { useState, useEffect } from "react";
import "./ApiDetails.css";

interface ApiDetailsProps {
  providerName: string;
  onBack: () => void; 
}

const ApiDetails: React.FC<ApiDetailsProps> = ({ providerName, onBack }) => {
  const [description, setDescription] = useState<string>('');
  const [contact, setContact] = useState<{ email: string; name: string; url: string }>({
    email: '',
    name: '',
    url: ''
  });
  const [swaggerUrl, setSwaggerUrl] = useState<string>('');
  const [logoUrl, setLogoUrl] = useState<string>(''); 

  useEffect(() => {
    const fetchApiDetails = async () => {
      if (!providerName) return; 
      try {
      
        const response = await fetch(`https://api.apis.guru/v2/${providerName}.json`);
        const data = await response.json();

       
        const apiData = data.apis[providerName];

        if (apiData) {
          setDescription(apiData.info.description);
          setContact(apiData.info.contact);
          setSwaggerUrl(apiData.swaggerUrl);
          setLogoUrl(apiData.info["x-logo"].url);
        }
      } catch (error) {
        console.error("Failed to fetch API details:", error);
      }
    };

    fetchApiDetails();
  }, [providerName]);

  return (
    <div>
      <div className="heading">
        {logoUrl && <img src={logoUrl} alt="API Logo" />} 
        <h2>{providerName}</h2>
      </div>
      <div className="body">
        <div className="description">
          <h3>Description</h3>
          <p>{description}</p>
        </div>

        <div className="swagger">
          <h3>Swagger</h3>
          <p>{swaggerUrl}</p> 
        </div>

        <div className="contact">
          <h3>Contact</h3>
          <p>Email - {contact.email}</p>
          <p>Name - {contact.name}</p>
          <p>URL - {contact.url}</p> 
        </div>

        <button onClick={onBack}>Explore more APIs</button> 
      </div>
    </div>
  );
};

export default ApiDetails;
