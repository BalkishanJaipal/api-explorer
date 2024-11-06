import React, { useState, useEffect } from "react";
import './MainPage.css';

interface MainPageProps {
  setProvider: React.Dispatch<React.SetStateAction<string>>;
}

const MainPage: React.FC<MainPageProps> = ({ setProvider }) => {
  const [sidebar, setSidebar] = useState(false);
  const [apiList, setApiList] = useState<string[]>([]);

  const getList = async () => {
    try {
      const response = await fetch("https://api.apis.guru/v2/providers.json");
      const data = await response.json();
      const providerList = data.data; 
      setApiList(providerList);
    } catch (error) {
      console.error("Failed to fetch API list:", error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="parent">
      <div className="child1">
        <button onClick={() => setSidebar(true)}>Explore Web APIs</button>
      </div>

      {sidebar && (
        <div className="child2">
          <p>Select Provider</p>
          <ul>
            {apiList.map((item, index) => (
              <li key={index} className="apilist" onClick={() => setProvider(item)}>
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MainPage;
