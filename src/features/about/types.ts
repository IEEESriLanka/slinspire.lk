import React from "react";

export interface Goal {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  stats: string;
}

export interface UniversityBranchPartner {
  name: string;
  logo: string;
}

export interface DetailedPartner {
  id: number;
  name: string;
  logo: string;
  website: string;
  description: string;
}
