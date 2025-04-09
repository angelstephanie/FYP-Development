import web3 from "./web3";
const addresses = [
  "0xc4bCd6859C7178079E72Deb9901a1B25E8b0C752",
  "0xD7F0e49fAFDf436422E2E665AB320eF82e164791",
  "0x0b1a573500D98c64376587CdBc2F70E8256f7b27",
];

const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "staffId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "staffName",
        type: "string",
      },
      {
        internalType: "string",
        name: "specialty",
        type: "string",
      },
      {
        internalType: "string[]",
        name: "qualifications",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "schedule",
        type: "string[]",
      },
    ],
    name: "addMedicalProfessional",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "dob",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "gender",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "ehrNumber",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "email",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "phoneNo",
        type: "uint256",
      },
    ],
    name: "addUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "dob",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "gender",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "ehrNumber",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "email",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "phoneNo",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "staffId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "date",
        type: "string",
      },
      {
        internalType: "string",
        name: "time",
        type: "string",
      },
      {
        internalType: "string",
        name: "status",
        type: "string",
      },
    ],
    name: "bookAppointment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bookingId",
        type: "uint256",
      },
    ],
    name: "cancelAppointment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "staffId",
        type: "uint256",
      },
    ],
    name: "removeMedicalProfessional",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_hospitalName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_hospitalType",
        type: "string",
      },
      {
        internalType: "string",
        name: "_hospitalDistrict",
        type: "string",
      },
      {
        internalType: "string",
        name: "_hospitalAddress",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "dob",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "gender",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "ehrNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "email",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "phoneNo",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "bookingId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "staffId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "date",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "time",
        type: "string",
      },
    ],
    name: "AppointmentBooked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "bookingId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "ehrNumber",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "staffId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "date",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "time",
        type: "string",
      },
    ],
    name: "AppointmentCanceled",
    type: "event",
  },
  {
    inputs: [],
    name: "contractAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllMedicalProfessionals",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "staffId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "staffName",
            type: "string",
          },
          {
            internalType: "string",
            name: "specialty",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "qualifications",
            type: "string[]",
          },
          {
            internalType: "string[]",
            name: "schedule",
            type: "string[]",
          },
        ],
        internalType: "struct MyContract.MedicalProfessional[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "staffId",
        type: "uint256",
      },
    ],
    name: "getAvailableAppointments",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "ehrNumber",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "staffId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "bookingId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "date",
            type: "string",
          },
          {
            internalType: "string",
            name: "time",
            type: "string",
          },
          {
            internalType: "string",
            name: "status",
            type: "string",
          },
        ],
        internalType: "struct MyContract.BookingAppointment[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getHospitalAddress",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getHospitalDistrict",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getHospitalName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getHospitalType",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "staffId",
        type: "uint256",
      },
    ],
    name: "getMedicalProfessionalById",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "staffId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "staffName",
            type: "string",
          },
          {
            internalType: "string",
            name: "specialty",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "qualifications",
            type: "string[]",
          },
          {
            internalType: "string[]",
            name: "schedule",
            type: "string[]",
          },
        ],
        internalType: "struct MyContract.MedicalProfessional",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "ehrNumber",
        type: "uint256",
      },
    ],
    name: "getUserAppointments",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "ehrNumber",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "staffName",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "staffId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "bookingId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "date",
            type: "string",
          },
          {
            internalType: "string",
            name: "time",
            type: "string",
          },
          {
            internalType: "string",
            name: "status",
            type: "string",
          },
        ],
        internalType: "struct MyContract.UserBooking[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "ehrNumber",
        type: "uint256",
      },
    ],
    name: "getUserByEhrNumber",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "dob",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "gender",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "ehrNumber",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "email",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "phoneNo",
            type: "uint256",
          },
        ],
        internalType: "struct MyContract.User",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const contracts = addresses.map(
  (address) => new web3.eth.Contract(abi, address)
);

export default contracts;
