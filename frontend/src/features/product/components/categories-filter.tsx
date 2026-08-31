import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import type { Category } from "../schema";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";

type CategoriesFilterProps = {
  categories: Category[];
  handleCategoriesChange: (categories: string[]) => void;
};
export function CategoriesFilter({
  categories,
  handleCategoriesChange,
}: CategoriesFilterProps) {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      categories: [],
    },
  });

  function onSubmit(data: { categories: string[] }) {
    handleCategoriesChange(data.categories);
  }

  return (
    <FieldSet>
      <FieldLegend variant="label" className="my-3">
        Categories
      </FieldLegend>

      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="gap-3">
          {categories.map((category) => (
            <Field orientation="horizontal" key={category.id}>
              <Controller
                name="categories"
                control={control}
                render={({ field }) => {
                  const currentValues = (field.value as string[]) || [];
                  const isChecked = currentValues.includes(category.id);
                  return (
                    <>
                      <Checkbox
                        id={category.id}
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange([...currentValues, category.id]);
                          } else {
                            field.onChange(
                              currentValues.filter(
                                (id: string) => id !== category.id,
                              ),
                            );
                          }
                        }}
                      />
                      <FieldLabel htmlFor={category.id} className="font-normal">
                        {category.name}
                      </FieldLabel>
                    </>
                  );
                }}
              />
            </Field>
          ))}
        </FieldGroup>
        <div className="flex justify-center mt-4    ">
          <Button type="submit" variant="secondary">
            Filter
          </Button>
        </div>
      </form>
    </FieldSet>
  );
}
