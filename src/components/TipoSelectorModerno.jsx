import React from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Car, Home } from "lucide-react";

const TipoSelectorModerno = ({ tipoBem, setTipoBem }) => {
  return (
    <div className="flex justify-center mb-6 sm:mb-8 animate-fade-in">
      <Tabs
        value={tipoBem}
        onValueChange={setTipoBem}
        className="w-full max-w-md"
      >
        <TabsList className="grid w-full grid-cols-2 h-14">
          <TabsTrigger
            value="carro"
            className="text-base sm:text-lg flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            <Car className="w-5 h-5" />
            <span>Carro</span>
          </TabsTrigger>
          <TabsTrigger
            value="imovel"
            className="text-base sm:text-lg flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            <Home className="w-5 h-5" />
            <span>Imóvel</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TipoSelectorModerno;
