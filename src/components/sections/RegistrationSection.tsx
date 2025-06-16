import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { X, User, Mail, Phone, GraduationCap, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export const RegistrationSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    school: "",
    grade: "",
    province: "",
    interests: ""
  });

  const registrationTypes = [
    {
      id: "career-compass",
      title: "Career Compass Session",
      description: "Comprehensive career guidance program with industry professionals and personalized assessments.",
      icon: "🧭",
      color: "from-purple-500 to-indigo-600",
      features: ["Career Assessment", "Industry Insights", "Personalized Guidance", "Resource Materials"]
    },
    {
      id: "after-al",
      title: "After A/L Session",
      description: "Specialized guidance for A/L completers on university admissions and alternative pathways.",
      icon: "🎓",
      color: "from-blue-500 to-cyan-600",
      features: ["University Guidance", "Scholarship Info", "Alternative Paths", "Application Support"]
    },
    {
      id: "after-ol",
      title: "After O/L Session",
      description: "Help O/L students choose their A/L streams and understand future opportunities.",
      icon: "📚",
      color: "from-green-500 to-teal-600",
      features: ["Stream Selection", "Subject Guidance", "Future Planning", "Aptitude Tests"]
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    setSelectedForm(null);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      school: "",
      grade: "",
      province: "",
      interests: ""
    });
  };

  return (
    <section id="registration" className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Registration <span className="text-purple-600">Forms</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sign up for our upcoming sessions and take the first step towards your bright future.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {registrationTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="group h-full hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${type.color}`} />
                
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-6">{type.icon}</div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {type.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {type.description}
                  </p>

                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-3">What you'll get:</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      {type.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center justify-center gap-2">
                          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    onClick={() => setSelectedForm(type.id)}
                    className={`w-full bg-gradient-to-r ${type.color} hover:shadow-lg transition-all duration-300`}
                  >
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Registration Modal */}
      <Dialog open={selectedForm !== null} onOpenChange={() => setSelectedForm(null)}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              {registrationTypes.find(t => t.id === selectedForm)?.title}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div className="relative">
              <GraduationCap className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="school"
                placeholder="School/College"
                value={formData.school}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <select
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="">Select Grade</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
                <option value="13">Grade 13</option>
                <option value="completed">Completed A/L</option>
              </select>

              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Province</option>
                  <option value="western">Western</option>
                  <option value="central">Central</option>
                  <option value="southern">Southern</option>
                  <option value="northern">Northern</option>
                  <option value="eastern">Eastern</option>
                  <option value="north-western">North Western</option>
                  <option value="north-central">North Central</option>
                  <option value="uva">Uva</option>
                  <option value="sabaragamuwa">Sabaragamuwa</option>
                </select>
              </div>
            </div>

            <textarea
              name="interests"
              placeholder="Career interests or questions (optional)"
              value={formData.interests}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedForm(null)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                Submit Registration
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};