import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Select, SelectContent,  SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Textarea } from "../ui/textarea";

function FormControls({formControls = [], formData, setFormData}) {

    function renderComponentByType(getControlItem){
        let element = null;

        const currentControlItemValue = formData[getControlItem.name] || ""

        switch (getControlItem.componentType){
            case "input" : 
            element = (
             <Input 
              id = {getControlItem.name}
              name = {getControlItem.name}
              placeholder= {getControlItem.placeholder}
              type = {getControlItem.type}
               onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
              value={currentControlItemValue}
             />
            );
            break;
            case "select" :
                 element = (
                    <Select
                     onValueChange={(value) =>
                    setFormData({
                        ...formData,
                        [getControlItem.name]: value,
                    })
                    }
                    value={currentControlItemValue}
                    >
                      <SelectTrigger className="w-full">
                       <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent>
                       {getControlItem.options && getControlItem.options.length > 0
                        ? getControlItem.options.map((optionItem) => (
                            <SelectItem key={optionItem.id} value={optionItem.id}>
                            {optionItem.label}
                            </SelectItem>
                        ))
                        : null}
                      </SelectContent>
                    </Select>
                 );
                 break;
            case "textarea" : 
            element = (
             <Textarea 
              id = {getControlItem.name}
              name = {getControlItem.name}
              placeholder= {getControlItem.placeholder}
               onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
              value={currentControlItemValue}
             />
            );
            break; 
                  default:
        element = (
          <Input
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
        }
        return element;
    }
    return ( 
        <div className="flex flex-col gap-3">
          {
            formControls.map(controlItem=> 
              <div key={controlItem.name}>
                <Label htmlFor={controlItem.name}>{controlItem.label}</Label>
                {renderComponentByType(controlItem)}                
              </div>
            )
          }
        </div>
     );
}

export default FormControls;