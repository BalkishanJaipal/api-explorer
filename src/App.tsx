import { useState } from 'react';
import './App.css';
import ApiDetails from './components/ApiDetails';
import MainPage from './components/MainPage';

function App() {
  const [provider, setProvider] = useState<string>(''); 
  const [isDetailsPageVisible, setIsDetailsPageVisible] = useState<boolean>(false); // State to control visibility

  const handleProviderSelect = (providerName: string) => {
    setProvider(providerName);
    setIsDetailsPageVisible(true); 
  };

  const handleBackToList = () => {
    setIsDetailsPageVisible(false); // Hide details page and show list
    setProvider(''); // Optionally reset the provider to clear details
  };

  return (
    <>
      {!isDetailsPageVisible ? (
        <MainPage setProvider={handleProviderSelect} />
      ) : (
        <ApiDetails providerName={provider} onBack={handleBackToList} />
      )}
    </>
  );
}

export default App;
