"use client";
import React, { useState } from "react";
import Image from "next/image";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const formSchema = z
  .object({
    beneficiary: z.enum(["university", "merchant"]),
    university: z.string().optional(),
    currency: z.string(),
    amount: z.string(),
    // emailAddress: z.string().email(),
    // middleName: z.string(),
    // Address: z.string(),
    // BVN: z.string(),
  })
  .refine(
    (data) => {
      if (data.beneficiary === "university") {
        return !!data.university;
      }
      return true;
    },
    {
      // error message
    }
  );

export default function Home() {
  const [formStep, setFormStep] = useState(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      university: "",
      currency: "",
    },
  });

  const increaseStep = () => {
    setFormStep((prevCount) => prevCount + 1);
  };

  const decreaseStep = () => {
    setFormStep((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  const beneficiary = form.watch("beneficiary");

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };
  return (
    <main className=" flex  flex-col  justify-between container pt-40 px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col  w-full max-w-lg gap-2"
        >
          {" "}
          {/* Beneficiary */}
          <div className={cn(" flex flex-col gap-4", { hidden: formStep > 0 })}>
            <FormField
              control={form.control}
              name="beneficiary"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormDescription className="mb-4">
                      To get started with your payment, please select the type
                      of beneficiary.
                    </FormDescription>
                    <Select onValueChange={field.onChange}>
                      <FormLabel>
                        Please select the type of beneficiary
                      </FormLabel>

                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Search..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="university">University</SelectItem>
                        <SelectItem value="merchant">Merchant</SelectItem>
                      </SelectContent>

                      <FormMessage />
                    </Select>
                  </FormItem>
                );
              }}
            />
            {beneficiary === "university" && (
              <FormField
                control={form.control}
                name="university"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Please select university</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Search..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Univeristy</SelectLabel>
                              <SelectItem value="wigwe university   ">
                                Wigwe University
                              </SelectItem>
                              <SelectItem value="coventry univerisity">
                                Coventry University
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            )}
          </div>
          {/* Payment */}
          <div
            className={cn("flex flex-col gap-4", {
              hidden: formStep < 1 || formStep > 1,
            })}
          >
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormDescription className="mb-4">
                      Please enter your payment details
                    </FormDescription>
                    <Select>
                      <FormLabel>
                        Select the country currency you have
                      </FormLabel>

                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Search..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="USD">
                          United States Dollar
                        </SelectItem>
                        <SelectItem value="GBP">British Pounds</SelectItem>
                      </SelectContent>

                      <FormMessage />
                    </Select>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="">
                      Enter the amount to pay {form.getValues("beneficiary")}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          {/* Payment Method */}
          <div
            className={cn(" flex flex-col gap-4", {
              hidden: formStep < 2 || formStep > 2,
            })}
          >
            <RadioGroup defaultValue="comfortable">
              <FormDescription className="mb-4">
                Select your preferred payment method
              </FormDescription>
              <div className="flex  flex-row justify-between items-center space-x-2  max-w-lg shadow-lg h-24 rounded-lg p-4">
                <div className="flex gap-2">
                  <RadioGroupItem value="comfortable" id="r2" className="" />
                  <Label htmlFor="r1">Credit Card / Debit Card</Label>
                </div>
                <div className="flex flex-row gap-2">
                  <Image
                    src="/visalogo.png"
                    alt="logo of visa company"
                    width={36}
                    height={16}
                  />
                  <Image
                    src="/mastercardlogo.svg"
                    alt="logo of visa company"
                    width={26}
                    height={13}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-2 max-w-lg shadow-lg h-24 rounded-lg p-4">
                <RadioGroupItem value="compact" id="r3" />
                <Label htmlFor="r2">Bank Transfer</Label>
              </div>
            </RadioGroup>
          </div>
          {/* Payer Details */}
          <div
            className={cn(" flex flex-col gap-4", {
              hidden: formStep < 3 || formStep > 3,
            })}
          >
            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormDescription className="mb-4">
                      Enter the details of the person making the payment.
                    </FormDescription>
                    <FormLabel className="">Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="">Middle Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Middle name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="Address"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="">Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="BVN"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="">BVN</FormLabel>
                    <FormControl>
                      <Input placeholder="BVN" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          {/* Buttons */}
          <div className="flex flex-row max-w-lg justify-between space-x-4">
            <div className="mt-12 w-72">
              <Button
                onClick={decreaseStep}
                className={cn("  rounded-3xl h-12 w-full bg-[#000B45] ", {
                  hidden: formStep === 0,
                })}
              >
                Back
              </Button>
            </div>
            <div className="mt-12 w-72">
              <Button
                className={cn("  rounded-3xl h-12 w-full bg-[#000B45] ", {
                  hidden: formStep === 3,
                })}
                onClick={increaseStep}
              >
                Continue
              </Button>
            </div>

            <div className="mt-12 w-72">
              <Button
                type="submit"
                className={cn("  rounded-3xl h-12 w-full bg-[#000B45] ", {
                  hidden: formStep < 3,
                })}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </main>
  );
}
