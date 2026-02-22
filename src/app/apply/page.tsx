"use client"

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { applicationSchema, ApplicationData } from '@/lib/validations';
import { StepIndicator } from '@/components/apply/StepIndicator';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { generateAppId } from '@/lib/generate-app-id';
import { GraduationCap, Camera, Upload, ArrowRight, ArrowLeft } from 'lucide-react';

const TOTAL_STEPS = 5;

export default function ApplyPage() {
  const [step, setStep] = useState(0);
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ApplicationData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      gender: 'Male',
      result_status: 'Pass',
      study_mode: 'Morning',
      admission_type: 'Regular',
      selected_subjects: [],
      declaration_agreed: false,
    }
  });

  const { register, handleSubmit, watch, setValue, formState: { errors } } = form;

  // Persist form data
  useEffect(() => {
    const savedData = localStorage.getItem('verdant_application_draft');
    if (savedData) {
      const data = JSON.parse(savedData);
      Object.keys(data).forEach((key) => {
        setValue(key as any, data[key]);
      });
    }
  }, [setValue]);

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem('verdant_application_draft', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data: ApplicationData) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      const appId = generateAppId();
      localStorage.removeItem('verdant_application_draft');
      router.push(`/apply/success?id=${appId}`);
    } catch (error) {
      toast({
        title: "Error submitting application",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    // In a real app, validate only current step fields here
    setStep(s => Math.min(s + 1, TOTAL_STEPS - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setStep(s => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="relative w-32 h-32 rounded-full border-2 border-dashed border-primary flex items-center justify-center group cursor-pointer overflow-hidden">
                <Camera className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] text-white bg-primary px-2 py-1 rounded">Upload Photo</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Passport size photograph (Max 2MB)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">First Name</Label>
                <input {...register('first_name')} className="flat-input w-full" placeholder="John" />
                {errors.first_name && <p className="text-destructive text-xs">{errors.first_name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Last Name</Label>
                <input {...register('last_name')} className="flat-input w-full" placeholder="Doe" />
                {errors.last_name && <p className="text-destructive text-xs">{errors.last_name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Father's Name</Label>
                <input {...register('father_name')} className="flat-input w-full" />
                {errors.father_name && <p className="text-destructive text-xs">{errors.father_name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">CNIC</Label>
                <input {...register('cnic')} className="flat-input w-full" placeholder="00000-0000000-0" />
                {errors.cnic && <p className="text-destructive text-xs">{errors.cnic.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Date of Birth</Label>
                <input type="date" {...register('date_of_birth')} className="flat-input w-full" />
                {errors.date_of_birth && <p className="text-destructive text-xs">{errors.date_of_birth.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Gender</Label>
                <div className="flex gap-4 pt-2">
                  {['Male', 'Female', 'Other'].map((g) => (
                    <Button
                      key={g}
                      type="button"
                      variant={watch('gender') === g ? 'default' : 'outline'}
                      className="pill-button h-8 px-4 text-xs"
                      onClick={() => setValue('gender', g as any)}
                    >
                      {g}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Email Address</Label>
                <input type="email" {...register('email')} className="flat-input w-full" />
                {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Phone Number</Label>
                <input {...register('phone')} className="flat-input w-full" />
                {errors.phone && <p className="text-destructive text-xs">{errors.phone.message}</p>}
              </div>
              <div className="col-span-full space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Full Postal Address</Label>
                <textarea {...register('address')} className="flat-input w-full min-h-[80px]" />
                {errors.address && <p className="text-destructive text-xs">{errors.address.message}</p>}
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <h3 className="text-2xl font-headline text-primary border-b border-primary/20 pb-2">Academic Background</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Previous Qualification</Label>
                <select {...register('qualification')} className="flat-input w-full">
                  <option value="">Select Qualification</option>
                  <option value="Matric">Matric / O-Level</option>
                  <option value="Intermediate">Intermediate / A-Level</option>
                  <option value="Bachelor">Bachelor</option>
                </select>
                {errors.qualification && <p className="text-destructive text-xs">{errors.qualification.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Board / Institute</Label>
                <input {...register('board_institute')} className="flat-input w-full" />
                {errors.board_institute && <p className="text-destructive text-xs">{errors.board_institute.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Passing Year</Label>
                <input type="number" {...register('passing_year')} className="flat-input w-full" />
                {errors.passing_year && <p className="text-destructive text-xs">{errors.passing_year.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Roll Number</Label>
                <input {...register('roll_number')} className="flat-input w-full" />
                {errors.roll_number && <p className="text-destructive text-xs">{errors.roll_number.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Total Marks</Label>
                <input type="number" {...register('total_marks')} className="flat-input w-full" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Obtained Marks</Label>
                <input type="number" {...register('obtained_marks')} className="flat-input w-full" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Percentage (%)</Label>
                <input type="number" step="0.01" {...register('percentage')} className="flat-input w-full" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Result Status</Label>
                <div className="flex gap-4 pt-2">
                  {['Pass', 'Awaiting'].map((s) => (
                    <Button
                      key={s}
                      type="button"
                      variant={watch('result_status') === s ? 'default' : 'outline'}
                      className="pill-button h-8 px-4 text-xs"
                      onClick={() => setValue('result_status', s as any)}
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <h3 className="text-2xl font-headline text-primary border-b border-primary/20 pb-2">Program Selection</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Preferred Faculty</Label>
                <div className="grid grid-cols-1 gap-3">
                  {['Computing', 'Engineering', 'Business', 'Liberal Arts'].map(f => (
                    <Card 
                      key={f}
                      className={cn(
                        "cursor-pointer transition-all hover:border-primary",
                        watch('faculty') === f ? "border-primary bg-primary/5" : "border-border"
                      )}
                      onClick={() => setValue('faculty', f)}
                    >
                      <CardContent className="p-4 flex items-center gap-4">
                        <GraduationCap className={cn("w-5 h-5", watch('faculty') === f ? "text-primary" : "text-muted-foreground")} />
                        <span className="font-medium">{f}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Specific Program</Label>
                  <select {...register('program')} className="flat-input w-full">
                    <option value="">Choose Program</option>
                    <option value="BS CS">BS Computer Science</option>
                    <option value="BS SE">BS Software Engineering</option>
                    <option value="BBA">Bachelors of Business Admin</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Study Mode</Label>
                  <div className="flex gap-4 pt-2">
                    {['Morning', 'Evening'].map((m) => (
                      <Button
                        key={m}
                        type="button"
                        variant={watch('study_mode') === m ? 'default' : 'outline'}
                        className="pill-button h-8 px-4 text-xs"
                        onClick={() => setValue('study_mode', m as any)}
                      >
                        {m}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Emergency Contact Name</Label>
                  <input {...register('emergency_contact_name')} className="flat-input w-full" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Emergency Contact Phone</Label>
                  <input {...register('emergency_contact_phone')} className="flat-input w-full" />
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <h3 className="text-2xl font-headline text-primary border-b border-primary/20 pb-2">Document Uploads</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'cnic_copy', label: 'CNIC / Form-B Copy' },
                { key: 'matric_cert', label: 'Matric Certificate' },
                { key: 'inter_cert', label: 'Intermediate Certificate' },
                { key: 'domicile', label: 'Domicile Certificate' },
                { key: 'photos', label: 'Passport Photographs' },
                { key: 'fee_receipt', label: 'Paid Bank Challan' }
              ].map(doc => (
                <Card key={doc.key} className="border-l-4 border-l-primary/30">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{doc.label}</p>
                      <p className="text-[10px] text-muted-foreground">PDF, JPG (Max 5MB)</p>
                    </div>
                    <Button variant="outline" size="sm" className="pill-button h-8 border-primary text-primary text-xs">
                      <Upload className="w-3 h-3 mr-2" /> Upload
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <h3 className="text-2xl font-headline text-primary border-b border-primary/20 pb-2">Declaration</h3>
            <div className="bg-secondary p-6 rounded-lg space-y-4">
              <p className="text-sm leading-relaxed text-primary/80 italic">
                I hereby solemnly declare that all information provided in this application is true and correct to the best of my knowledge. 
                I understand that any misrepresentation of facts will lead to immediate cancellation of my admission.
              </p>
              <div className="flex items-center space-x-2 pt-4">
                <Checkbox 
                  id="agreed" 
                  checked={watch('declaration_agreed')}
                  onCheckedChange={(checked) => setValue('declaration_agreed', checked === true)}
                />
                <label htmlFor="agreed" className="text-sm font-medium leading-none cursor-pointer">
                  I agree to the terms and conditions of Greenfield University
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Digital Signature (Type Full Name)</Label>
                  <input {...register('signature_name')} className="flat-input w-full font-headline italic" />
                  {errors.signature_name && <p className="text-destructive text-xs">{errors.signature_name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Date</Label>
                  <input type="date" {...register('signature_date')} className="flat-input w-full" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="h-[60px] w-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
        <h1 className="text-white font-headline text-xl tracking-widest uppercase">Admission Application Portal</h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8">
        <StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} />

        <Card className="step-card">
          <div className="botanical-bg" />
          <CardContent className="p-8 pt-10">
            <form onSubmit={handleSubmit(onSubmit)}>
              {renderStep()}

              <div className="flex justify-between items-center mt-12 pt-8 border-t">
                <Button
                  type="button"
                  variant="ghost"
                  className="pill-button text-primary"
                  onClick={prevStep}
                  disabled={step === 0 || isLoading}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                </Button>

                {step === TOTAL_STEPS - 1 ? (
                  <Button
                    type="submit"
                    className="pill-button bg-accent hover:bg-accent/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit Application →"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    className="pill-button bg-primary hover:bg-primary/90"
                    onClick={nextStep}
                    disabled={isLoading}
                  >
                    Next Step <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
