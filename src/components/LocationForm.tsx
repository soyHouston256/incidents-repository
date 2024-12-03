import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from './ui/button';
import { DatePickerReport } from './DatePicker';
import { locations } from '../lib/locations';
import { useToast } from "@/hooks/use-toast"
import { Toaster } from './ui/toaster';

// interface Locations {
//   [department: string]: {
//     [province: string]: string[]
//   }
// }
interface Locations {
  [department: string]: {
    [province: string]: string[];
  }
}

const typedLocations: Locations = locations;

interface FormData {
  region: string
  province: string
  district: string
  gender: string
  kindBussines: string
  explain: string
  date: Date | null
}

const LocationForm = () => {
  const { toast } = useToast();
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedBusinessKind, setSelectedBusinessKind] = useState('');
  const [selectExplain, setExplain] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);


  const businessKind = [
    "Bodega",
    "Restaurante",
    "Farmacia", 
    "Peluquería",
    "Chifa",
    "Cevicheria",
    "Ferretería",
    "Consultorio",
    "Taller",
    "Panadería",
    "Sangucheria",
    "Restobar",
    "Veterinaria",
    "Librería",
    "Gimnasio",
    "Otro"
   ];
  
  const genders = [
      "Varon",
      "Mujer"
  ]
  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
    setSelectedProvince('');
    setSelectedDistrict('');
  };
  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    setSelectedDistrict('');
  };
  
  const handleSubmit = async () => {
	const validateFields = () => {
      if (!selectedDepartment || !selectedProvince || !selectedDistrict || !selectedGender || !selectedBusinessKind || !selectedDate) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Complete todos los campos obligatorios"
        });
        return false;
      }
      return true;
    };
   
    const resetForm = () => {
      setSelectedDepartment('');
      setSelectedProvince('');
      setSelectedDistrict('');
      setSelectedGender('');
      setSelectedBusinessKind('');
      setExplain('');
      setSelectedDate(null);
    };
   
    if (!validateFields()) return;
   
    const formData: FormData = {
      region: selectedDepartment,
      province: selectedProvince,
      district: selectedDistrict,
      gender: selectedGender,
      kindBussines: selectedBusinessKind,
      explain: selectExplain,
      date: selectedDate
    };
   
    try {
      const response = await fetch('https://api.alertape.org/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      console.log("Response",response)
      if (response.status == 201 || response.status == 204) {
        toast({ title: "Éxito", description: "Reporte enviado correctamente", className: "bg-green-500 text-white"  });
        resetForm();
      } else {
        toast({ variant: "destructive", title: "Error", description: "Error al enviar el reporte" });
      }
    } catch (error) {
      console.log("Nos fuimos al catch")
      toast({ variant: "destructive", title: "Error", description: "No se pudo enviar el reporte" });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto justify-center">
      <CardHeader className="text-xl font-bold">Registro de Seguridad Comunitaria</CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Departamento<span className="text-red-500">*</span></label>
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
          <label className="block text-sm font-medium mb-2">Provincia<span className="text-red-500">*</span></label>
          <Select 
            onValueChange={handleProvinceChange} 
            value={selectedProvince}
            disabled={!selectedDepartment}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione provincia" />
            </SelectTrigger>
            <SelectContent>
                {selectedDepartment && locations[selectedDepartment as keyof typeof locations] && 
                Object.keys(locations[selectedDepartment as keyof typeof locations]).map((province) => (
                  <SelectItem key={province} value={province}>
                    {province}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Distrito<span className="text-red-500">*</span></label>
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
                typedLocations[selectedDepartment][selectedProvince]?.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))
              }

            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Genero<span className="text-red-500">*</span></label>
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
          <label className="block text-sm font-medium mb-2">Tipo de Negocio<span className="text-red-500">*</span></label>
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
            value={selectExplain}
            onChange={(e) => setExplain(e.target.value)}
          />
        </div>

        <div className='flex justify-center'>
          <DatePickerReport onDateChange={setSelectedDate} value={selectedDate}/>
        </div>

        <div className='flex justify-center'>
          <Button onClick={handleSubmit}>Reportar</Button>
        </div>
      </CardContent>
      <Toaster /> 
    </Card>
  );
};

export default LocationForm;