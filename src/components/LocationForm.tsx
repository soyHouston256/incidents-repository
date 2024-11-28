import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LocationForm = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  // Sample data - replace with your actual data
  const locations = {
  'Amazonas': {
    'Chachapoyas': ['Chachapoyas', 'Asunción', 'Balsas', 'Cheto', 'Chiliquín', 
                    'Chuquibamba', 'Granada', 'Huancas', 'La Jalca', 
                    'Leimebamba', 'Levanto', 'Magdalena', 'Mariscal Castilla', 
                    'Molinopampa', 'Montevideo', 'Olleros', 'Quinjalca', 
                    'San Francisco de Daguas', 'San Isidro de Maino', 
                    'Soloco', 'Sonche'],
    'Bagua': ['Bagua', 'Aramango', 'Copallín', 'El Parco', 'Imaza', 'La Peca'],
    'Bongará': ['Jumbilla', 'Chisquilla', 'Churuja', 'Corosha', 'Cuispes', 
                'Florida', 'Jazán', 'Recta', 'San Carlos', 
                'Shipasbamba', 'Valera', 'Yambrasbamba']
  },
  'Áncash': {
    'Huaraz': ['Huaraz', 'Cochabamba', 'Colcabamba', 'Huanchay', 
               'Independencia', 'Jangas', 'La Libertad', 'Olleros', 
               'Pampas Grande', 'Pariacoto', 'Pira', 'Tarica'],
    'Carhuaz': ['Carhuaz', 'Acopampa', 'Amashca', 'Anta', 'Ataquero', 
                'Marcara', 'Pariahuanca', 'San Miguel de Aco', 
                'Shilla', 'Tinco', 'Yungar']
  },
  'Apurímac': {
    'Abancay': ['Abancay', 'Chacoche', 'Circa', 'Curahuasi', 'Huanipaca', 
                'Lambrama', 'Pichirhua', 'San Pedro de Cachora', 
                'Tamburco'],
    'Andahuaylas': ['Andahuaylas', 'Andarapa', 'Chiara', 'Huancarama', 
                    'Huancaray', 'Huayana', 'Kaquiabamba', 
                    'Kishuara', 'Pacobamba', 'Pacucha', 
                    'Pampachiri', 'Pocohuanca', 'San Antonio de Cachi', 
                    'San Jerónimo', 'Talavera', 'Tumay Huaraca', 
                    'Turpo']
  },
  'Arequipa': {
    'Arequipa': ['Alto Selva Alegre', 'Arequipa', 'Cayma', 
                 'Cerro Colorado', 'Characato', 'Chiguata', 
                 'Jacobo Hunter', 'José Luis Bustamante y Rivero', 
                 'La Joya', 'Mariano Melgar', 'Miraflores', 
                 'Mollebaya', 'Paucarpata', 'Pocsi', 
                 'Polobaya', 'Quequeña', 'Sabandia', 
                 'Sachaca', 'San Juan de Siguas', 
                 'San Juan de Tarucani', 'Santa Isabel de Siguas', 
                 'Santa Rita de Siguas', 'Socabaya', 
                 'Tiabaya', 'Uchumayo', 'Vitor', 
                 'Yanahuara', 'Yarabamba', 'Yura'],
    'Camana': ['Camaná', 'José María Quimper', 'Mariano Nicolás Valcárcel', 
               'Mariscal Cáceres', 'Nicolás de Piérola', 'Ocoña', 
               'Quilca', 'Samuel Pastor'],
    'Islay': ['Cocachacra', 'Dean Valdivia', 'Islay', 
              'Mejía', 'Mollendo', 'Punta de Bombón']
  },
  'Ayacucho': {
    'Ayacucho': ['Ayacucho', 'Acocro', 'Carmen Alto', 'Chiara', 
                 'Huamanguilla', 'Jesús Nazareno', 'Pueblo Nuevo', 
                 'Quinua', 'San José de Ticllas', 'San Juan Bautista'],
    'Cangallo': ['Cangallo', 'Andamarca', 'Ayahuanca', 'Chuschi', 
                 'Huancaraylla', 'Mollepampa', 'Sancos'],
    'Huanta': ['Huanta', 'Ayahuanca', 'Huamanguilla', 'San Juan de Chacña']
  },
  'Cajamarca': {
    'Cajamarca': ['Cajamarca', 'Baños del Inca', 'Chetilla', 
                  'Encañada', 'Jesús', 'Los Baños del Inca', 
                  'Magdalena', 'Matara', 'Pampa Hermosa'],
    'Celendín': ['Celendín', 'Chumuch', 'La Unión', 
                 'Leimebamba', 'Mollepampa', 'Pachacutec'],
    'Chota': ['Chota', 'Chalamarca', 'Condebamba', 'Huambos', 
              'Llama', 'Miracosta', 'Tocmoche']
  },
  'Cusco': {
    'Cusco': ['Cusco', 'San Sebastián', 'San Jerónimo', 
              'Santiago', 'Wanchaq'],
    'Urubamba': ['Chinchero', 'Huayllabamba', 'Maras', 
                 'Ollantaytambo', 'Urubamba', 'Yucay'],
    'Anta': ['Anta', 'Cachimayo', 'Chinchaypujio', 
             'Huarocondo', 'Limatambo', 'Mollepata', 
             'Pucyura', 'Zurite']
  },
  'Huancavelica': {
    'Huancavelica': ['Huancavelica', 'Acobamba', 'Angaraes'],
    'Castrovirreyna': ['Castrovirreyna', 'Arma'],
    'Churcampa': ['Churcampa', 'Anco'],
  },
  'Huánuco': {
    'Huánuco': ['Huánuco', 'Chinchao', 'San Francisco de Cayrán'],
    'Marañón': ['Marañón', 'Pachachaca'],
    'Leoncio Prado': ['Leoncio Prado', 'Rupa-Rupa']
  },
  'Ica': {
    'Ica': ['Ica', 'Chincha Alta', 'Pisco', 'Nazca'],
    'Palpa': ['Palpa', 'Tonosí'],
    'Nasca': ['Nasca', 'Marcona']
  },
  'Junín': {
    'Huancayo': ['Huancayo', 'Chilca', 'El Tambo', 
                 'Pilcomayo', 'Pucará', 'Quilcas', 
                 'San Agustín', 'Sapallanga', 'Sicaya'],
    'Chanchamayo': ['Chanchamayo', 'Perené', 'Pichanaqui', 
                    'San Luis de Shuaro', 'San Ramón', 
                    'Vitoc']
  },
  'La Libertad': {
    'Trujillo': ['Trujillo', 'El Porvenir', 'La Esperanza', 
                 'Moche', 'Salaverry', 'Víctor Larco', 
                 'Laredo', 'FLORENCIA DE MORA', 'Sinsicap'],
    'Pacasmayo': ['Pacasmayo', 'Jequetepeque', 'San Pedro de Lloc'],
    'Ascope': ['Ascope', 'Chicama', 'Paiján']
  },
  'Lambayeque': {
    'Chiclayo': ['Chiclayo', 'Chongoyape', 'Eten', 'Eten Puerto', 
                 'José Leonardo Ortiz', 'La Victoria', 'Lambayeque', 
                 'Monsefu', 'Nueva Arica', 'Olmos', 'Pomalca', 
                 'Pucalá', 'Reque', 'Salas', 'San José', 'Tuman'],
    'Ferreñafe': ['Ferreñafe', 'Cañaris', 'Incahuasi', 'Pitipo', 'Pueblo Nuevo'],
    'Lambayeque': ['Chongoyape', 'Eten', 'Eten Puerto', 'José Leonardo Ortiz', 
                   'La Victoria', 'Lambayeque', 'Monsefu', 'Nueva Arica']
  },
  'Lima': {
    'Lima': ['Ancón', 'Ate', 'Barranco', 'Breña', 'Carabayllo', 
             'Chaclacayo', 'Chorrillos', 'Cieneguilla', 'Comas', 
             'El Agustino', 'Independencia', 'Jesús María', 
             'La Molina', 'La Victoria', 'Lince', 'Los Olivos', 
             'Lurigancho-Chosica', 'Lurin', 'Magdalena del Mar', 
             'Miraflores', 'Pachacamac', 'Pucusana', 'Pueblo Libre', 
             'Puente Piedra', 'Punta Hermosa', 'Punta Negra', 
             'Rímac', 'San Bartolo', 'San Borja', 'San Isidro', 
             'San Juan de Lurigancho', 'San Juan de Miraflores', 
             'San Luis', 'San Martín de Porres', 'San Miguel', 
             'Santa Anita', 'Santa María del Mar', 'Santa Rosa', 
             'Santiago de Surco', 'Surquillo', 'Villa El Salvador', 
             'Villa María del Triunfo'],
    'Callao': ['Callao', 'Bellavista', 'Carmen de la Legua-Reynoso', 
               'La Perla', 'La Punta', 'Ventanilla', 'Mi Perú']
  },
  'Loreto': {
    'Iquitos': ['Iquitos', 'Belen', 'San Juan Bautista', 
                'Punta de San Juan', 'San Pablo', 'Indiana', 
                'Nauta', 'Requena', 'Contamana'],
    'Alto Amazonas': ['Alto Amazonas', 'Pebas', 'Yurimaguas'],
    'Maynas': ['Maynas', 'Nauta', 'San Juan de Lurigancho']
  },
  'Madre de Dios': {
    'Puerto Maldonado': ['Puerto Maldonado', 'Inambari', 'Las Piedras', 
                          'Manu', 'Tambopata'],
    'Tambopata': ['Tambopata', 'Puerto Maldonado']
  },
  'Moquegua': {
    'Moquegua': ['Moquegua', 'Carumas', 'Cuchumbaya', 'San Cristóbal', 
                 'San Fernando', 'Santo Domingo', 'Torata'],
    'Ilo': ['Ilo', 'El Algarrobal', 'Pachía', 'Puquina', 'Viñani']
  },
  'Pasco': {
    'Pasco': ['Pasco', 'Chaupimarca', 'Huasahuasi', 'Paucartambo', 
              'Yanahuanca', 'Ticlacayán', 'Tumbo', 'Paucartambo'],
    'Oxapampa': ['Oxapampa', 'Villa Rica', 'Chontabamba', 'Palcazu', 
                 'Vraem', 'Tinki', 'Atalaya']
  },
  'Piura': {
    'Piura': ['Piura', 'Castilla', 'Catacaos', 'Cura Mori', 'La Arena', 
              'La Unión', 'Las Lomas', 'Tambo Grande', 'Veintiséis de Octubre'],
    'Sullana': ['Sullana', 'Bellavista', 'Ignacio Escudero', 
                'Lancones', 'Marcavelica', 'Salitral'],
    'Talara': ['Talara', 'El Alto', 'La Brea', 'Los Órganos', 'Máncora'],
    'Paita': ['Paita', 'Colán', 'Vichayal', 'Amotape']
  },
  'Puno': {
    'Puno': ['Puno', 'Acora', 'Arapa', 'Atuncolla', 'Chucuito', 'Desaguadero', 
             'Huancané', 'Lampa', 'Livia', 'Mazocruz', 'Pichacani', 'San Antón', 
             'San José de Salinas', 'San Pedro', 'Santa Rosa'],
    'Juliaca': ['Juliaca', 'San Román', 'Puno', 'Carabaya', 'Chucuito'],
    'San Román': ['San Román', 'Juliaca', 'Yunguyo']
  },
  'San Martín': {
    'Moyobamba': ['Moyobamba', 'Bellavista', 'Cacatachi', 'Calzada', 
                  'Soritor', 'Tabalosos', 'Yantalo'],
    'Tarapoto': ['Tarapoto', 'Alto Biavo', 'Cacatachi', 'Chazuta', 
                 'Huallaga', 'Juan Guerra', 'Morales', 'Pucallpa', 
                 'San Martín'],
    'Picota': ['Picota', 'Shatoja', 'Tingo de Saposoa']
  },
  'Tacna': {
    'Tacna': ['Tacna', 'Alto de la Alianza', 'Candarave', 'Calana', 
              'Ciudad Nueva', 'Inclán', 'Pocollay', 'Sama', 'La Yarada'],
    'Jorge Basadre': ['Jorge Basadre', 'Locumba', 'Santo Domingo', 
                      'San Pedro', 'La Yarada'],
    'Tarata': ['Tarata', 'Estique', 'Estique Pampa', 'Locumba', 
               'Santo Domingo']
  },
  'Tumbes': {
    'Tumbes': ['Tumbes', 'Cañaveral', 'Corrales', 'La Cruz', 
               'Pampa Grande', 'Zorritos'],
    'Zorritos': ['Zorritos', 'Papayal', 'Pampa Grande']
  },
  'Ucayali': {
    'Pucallpa': ['Pucallpa', 'Yarinacocha', 'Calleria', 'Campoverde', 
                 'Manantay', 'Nueva Requena', 'Curimana'],
    'Coronel Portillo': ['Coronel Portillo', 'San Alejandro', 
                         'José Carlos Mariátegui', 'Fitzcarrald']
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