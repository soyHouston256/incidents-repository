// types.ts
interface LocationData {
    [department: string]: {
      [province: string]: string[];
    };
  }
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  // DepartmentSelect.tsx
  interface DepartmentSelectProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    departments: string[];
  }
  
  export const DepartmentSelect: React.FC<DepartmentSelectProps> = ({ value, onChange, departments }) => (
    <div>
      <label className="block text-sm font-medium mb-2">Departamento</label>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>  
      </Select>
    </div>
  );
  
  // ProvinceSelect.tsx
  interface ProvinceSelectProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    provinces: string[];
    disabled: boolean;
  }
  
  export const ProvinceSelect: React.FC<ProvinceSelectProps> = ({ value, onChange, provinces, disabled }) => (
    <div>
      <label className="block text-sm font-medium mb-2">Provincia</label>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <option value="">Seleccione provincia</option>
        {provinces.map((province) => (
          <option key={province} value={province}>{province}</option>
        ))}
      </select>
    </div>
  );
  
  // DistrictSelect.tsx
  interface DistrictSelectProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    districts: string[];
    disabled: boolean;
  }
  
  export const DistrictSelect: React.FC<DistrictSelectProps> = ({ value, onChange, districts, disabled }) => (
    <div>
      <label className="block text-sm font-medium mb-2">Distrito</label>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <option value="">Seleccione distrito</option>
        {districts.map((district) => (
          <option key={district} value={district}>{district}</option>
        ))}
      </select>
    </div>
  );