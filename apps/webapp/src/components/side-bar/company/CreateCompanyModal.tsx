import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useUploadFile } from '@/hooks/upload/useUploadFile';
import { organization } from '@/lib/auth-client';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Label,
} from '@repo/ui/components';
import { toast } from 'sonner';

const companySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  slogan: z.string().optional(),
  address: z.string().min(2, 'Address is required'),
  logo: z.instanceof(File).optional().or(z.null()),
});

type CompanyFormValues = z.infer<typeof companySchema>;

type CreateCompanyModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const CreateCompanyModal: React.FC<CreateCompanyModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [uploadFile] = useUploadFile();
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: '',
      slogan: '',
      address: '',
      logo: null,
    },
  });

  const name = form.watch('name');
  const slug = slugify(name);

  const onCreateOrganization = async (data: CompanyFormValues) => {
    const savedFile = await uploadFile({ file: data.logo as File });

    const logoUrl = `${import.meta.env.VITE_PUBLIC_CDN_URL}${savedFile.fileUrl}`;

    try {
      const orgData = await organization.create({
        name: data.name,
        slogan: data.slogan as string,
        slug,
        address: data.address,
        logo: logoUrl,
      });

      const orgId = orgData.data?.id as string;

      organization.setActive({ organizationId: orgId });

      toast.success('Company created successfully!');
      form.reset();
      onOpenChange(false);
    } catch (err) {
      const error = err as { message: string };
      toast.error(`Error creating company: ${error.message}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Company</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onCreateOrganization)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name">Name</Label>
                  <FormControl>
                    <Input id="name" placeholder="Company Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={slug}
                disabled
                readOnly
                placeholder="company-name"
              />
            </div>
            <FormField
              control={form.control}
              name="slogan"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="slogan">Slogan</Label>
                  <FormControl>
                    <Input
                      id="slogan"
                      placeholder="Company Slogan"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="address">Address</Label>
                  <FormControl>
                    <Input
                      id="address"
                      placeholder="Company Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="logo">Logo Image</Label>
                  <FormControl>
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          field.onChange(e.target.files[0]);
                        } else {
                          field.onChange(null);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Create
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
