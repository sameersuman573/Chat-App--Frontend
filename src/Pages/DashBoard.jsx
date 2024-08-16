import Header from "../Components/Transaction/AppBar";
import { Balance } from "../Components/Transaction/Balance";

export const DashBoard = () => {
  return (
    <div>
      <div className="flex justify-between">
        <Header />
      </div>

      <div className="flex justify-between mt-8">
        {/* Card for the Image */}
        
        <div className="flex-1 m-2 p-4 bg-white rounded shadow" style={{ height: '50vh' }}>
          <img
            src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Description of image"
            className="w-full h-full object-cover rounded" // Ensures the image covers the entire card
          />
          
        </div>

        {/* Card for the Balance */}
        <div className="flex-1 m-2 p-4 bg-white rounded shadow" style={{ height: '50vh' }}>
          <Balance />
        </div>
        
      </div>

      <div className="text-6xl flex-1 m-2 p-4 bg-white rounded shadow" style={{ height: '50vh' }}>
      🅦🅐🅝🅝🅐 🅑🅤🅨 🅢🅞🅜🅔🅣🅗🅘🅝🅖 --  🅿🅰🆈 🅲🅷🅰🅲🅰🅻 🆃🆁🅰🅳🅴🆁🆂        </div>
    </div>
  );
};
