import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from './ui/button';
import { DatePickerReport } from './DatePicker';
import { locations } from '../lib/locations';
const LocationForm = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedBusinessKind, setSelectedBusinessKind] = useState('');
  const [threatDescription, setThreatDescription] = useState('');


  // Sample data - replace with your actual data
  const businessKind = [
    "Restaurante",
    "Hotel",
    "Tienda",
    "Consultorio",
    "Oficina",
    "Otro"
  ];
  const genders = [
      "masculino",
      "femenino"
  ]
  
  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
    setSelectedProvince('');
    setSelectedDistrict('');
  };

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
    setSelectedDistrict('');
  };


  const handleSubmit = async () => {
    const formData = {
      department: selectedDepartment,
      province: selectedProvince,
      district: selectedDistrict,
      gender: selectedGender,
      businessKind: selectedBusinessKind,
      threatDescription: threatDescription,
    };

    console.log(formData)

    try {
      const response = await fetch('http://localhost:3000/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Reporte enviado con éxito');
      } else {
        alert('Hubo un error al enviar el reporte');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('No se pudo enviar el reporte');
    }
  };
  

  return (
    <Card className="w-full max-w-md mx-auto justify-center">
      <CardHeader className="text-xl font-bold">Formulario de Reporte</CardHeader>
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
        
        <div>
          <label className="block text-sm font-medium mb-2">Genero</label>
          <Select 
            onValueChange={setSelectedGender}
            value={selectedGender}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione Genero" />
            </SelectTrigger>
            <SelectContent>
              {genders.map((gender) => (
                <SelectItem key={gender} value={gender}>
                  {gender}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tipo de Negocio</label>
          <Select 
            onValueChange={setSelectedBusinessKind}
            value={selectedBusinessKind}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione tipo de negocio" />
            </SelectTrigger>
            <SelectContent>
              {businessKind.map((kind) => (
                <SelectItem key={kind} value={kind}>
                  {kind}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Explique brevemente la amenaza</label>
          <textarea 
            className="w-full min-h-[100px] rounded-md border border-gray-300 p-2" 
            placeholder="Me mandaron una granada"
            value={threatDescription}
            onChange={(e) => setThreatDescription(e.target.value)}
          />
        </div>
        <div className='flex justify-center'>
          <DatePickerReport/>
        </div>
        <div className='flex justify-center'>
          <Button onClick={handleSubmit}>Reportar</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationForm;