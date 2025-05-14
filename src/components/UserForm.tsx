
import { useState } from "react";
import { UserData } from "../types/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface UserFormProps {
  onSubmit: (data: UserData) => void;
}

const UserForm = ({ onSubmit }: UserFormProps) => {
  const [formData, setFormData] = useState<UserData>({
    name: "",
    designation: "",
    company: "",
    email: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof UserData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof UserData, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.designation.trim()) {
      newErrors.designation = "Designation is required";
    }
    
    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user types
    if (errors[name as keyof UserData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
        Personal Details
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleInputChange}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="designation">Designation</Label>
          <Input
            id="designation"
            name="designation"
            placeholder="Software Engineer"
            value={formData.designation}
            onChange={handleInputChange}
            className={errors.designation ? "border-red-500" : ""}
          />
          {errors.designation && (
            <p className="text-sm text-red-500">{errors.designation}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            placeholder="Acme Inc."
            value={formData.company}
            onChange={handleInputChange}
            className={errors.company ? "border-red-500" : ""}
          />
          {errors.company && (
            <p className="text-sm text-red-500">{errors.company}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full bg-theme-600 hover:bg-theme-700 text-white"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
