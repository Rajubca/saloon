"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const bookingSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(50),
  phone: z.string().regex(/^[0-9]{10}$/, "Must be a 10-digit phone number"),
  service: z.enum(["hair", "skin", "bridal"]),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
    defaultValues: {
      service: "hair",
    }
  });

  const onSubmit = (data: BookingFormValues) => {
    setIsSuccess(true);
    console.log("Booking data:", data);
  };

  const nextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger(["fullName", "phone"]);
    } else if (step === 2) {
      isValid = await trigger(["service"]);
    }

    if (isValid) {
      setStep(step + 1);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-12 text-center border border-primary/20 rounded-lg bg-card"
      >
        <CheckCircle2 className="w-16 h-16 text-primary mb-6" />
        <h3 className="font-serif text-3xl mb-4 text-foreground">Booking Confirmed</h3>
        <p className="text-muted-foreground">
          Thank you for choosing Free Bird Saloon. We will see you soon!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-8 border border-border rounded-lg bg-card">
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="font-serif text-xl mb-4 text-foreground">Personal Details</h3>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Full Name</label>
                <Input {...register("fullName")} placeholder="Jane Doe" maxLength={50} />
                {errors.fullName && <p className="text-destructive text-sm">{errors.fullName.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Phone Number</label>
                <Input {...register("phone")} type="tel" placeholder="9898678440" />
                {errors.phone && <p className="text-destructive text-sm">{errors.phone.message}</p>}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="font-serif text-xl mb-4 text-foreground">Select Service</h3>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Service Category</label>
                <select {...register("service")} className="w-full flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                  <option className="bg-background text-foreground" value="hair">Hair Styling & Care</option>
                  <option className="bg-background text-foreground" value="skin">Skin Treatments</option>
                  <option className="bg-background text-foreground" value="bridal">Bridal Makeup</option>
                </select>
                {errors.service && <p className="text-destructive text-sm">{errors.service.message}</p>}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="font-serif text-xl mb-4 text-foreground">Date & Time</h3>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Preferred Date</label>
                <Input {...register("date")} type="date" />
                {errors.date && <p className="text-destructive text-sm">{errors.date.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Preferred Time</label>
                <Input {...register("time")} type="time" />
                {errors.time && <p className="text-destructive text-sm">{errors.time.message}</p>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between pt-4">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
          )}

          {step < 3 ? (
            <Button type="button" onClick={nextStep} className="ml-auto">
              Continue
            </Button>
          ) : (
            <Button type="submit" className="ml-auto">
              Confirm Booking
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
