"use client";

import { updateSetting } from "@/functions/settings";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "../ui/use-toast";

export const InputSetting = ({
  title,
  setting,
  inputType = "text",
  defaultValue,
  placeholder,
  token,
  confidential
}: {
  title: string;
  setting: string;
  inputType: string;
  defaultValue: string;
  placeholder: string;
  token: string;
  confidential: boolean;
}) => {
  const onUpdateSetting = async (e: any) => {
    const updatedSetting = await updateSetting(setting, e.target.value, token, confidential);

    if (updatedSetting.status === 200) {
      toast({
        variant: "success",
        title: "Configuração atualizada com sucesso",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Não foi possível atualizar a configuração",
      });
    }
  };

  return (
    <div>
      <Label>{title}</Label>
      <Input
        onBlur={(e) => onUpdateSetting(e)}
        defaultValue={defaultValue}
        placeholder={placeholder}
        type={inputType}
      />
    </div>
  );
};
