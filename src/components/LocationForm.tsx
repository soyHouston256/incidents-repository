import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LocationForm = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  // Sample data - replace with your actual data
  const locations = {
    'Lima': {
      'Lima': ['Miraflores', 'San Isidro', 'Surco'],
      'Callao': ['La Punta', 'Bellavista', 'Ventanilla']
    },
    'Arequipa': {
      'Arequipa': ['Cercado', 'Cayma', 'Yanahuara'],
      'Caylloma': ['Chivay', 'Achoma', 'Cabanaconde']
    }
  };

  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
    setSelectedProvince('');
    setSelectedDistrict('');
  };

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
    setSelectedDistrict('');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-xl font-bold">Ubicación</CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Departamento</label>
          <Select onValueChange={handleDepartmentChange} value={selectedDepartment}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione departamento" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(locations).map((department) => (
                <SelectItem key={department} value={department}>
                  {department}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Provincia</label>
          <Select 
            onValueChange={handleProvinceChange} 
            value={selectedProvince}
            disabled={!selectedDepartment}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione provincia" />
            </SelectTrigger>
            <SelectContent>
              {selectedDepartment && 
                Object.keys(locations[selectedDepartment]).map((province) => (
                  <SelectItem key={province} value={province}>
                    {province}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Distrito</label>
          <Select 
            onValueChange={setSelectedDistrict}
            value={selectedDistrict}
            disabled={!selectedProvince}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione distrito" />
            </SelectTrigger>
            <SelectContent>
              {selectedDepartment && selectedProvince &&
                locations[selectedDepartment][selectedProvince].map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationForm;