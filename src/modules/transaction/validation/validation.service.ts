import { Injectable } from '@nestjs/common';
import * as Joi from "joi";

@Injectable()
export class ValidationService {
    async transactionSchema(data){

        const schema = Joi.object({
            amount: Joi.number()
                .required()
                .messages({
                    'number.base': 'amount field in the request body should be of type number',
                    'number.empty': 'amount cannot be an empty field in the request body',
                    'any.required': 'amount is a required field in the request body'
                }),
            currency: Joi.string().uppercase()
                .length(3)
                .valid(
                    "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM",
                    "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD",
                    "BTC", "BTN", "BWP", "BYN", "BYR", "BZD", "CAD", "CDF", "CHF", "CLF", "CLP", "CNY",
                    "COP", "CRC", "CUC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN",
                    "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD",
                    "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD",
                    "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD",
                    "LSL", "LTL", "LVL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MUR", "MVR",
                    "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK",
                    "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK",
                    "SGD", "SHP", "SLL", "SOS", "SRD", "STD", "SVC", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP",
                    "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VEF", "VND", "VUV", "WST", "XAF",
                    "XAG", "XAU", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMK", "ZMW", "ZWL"
                )
                .required()
                .messages({
                    'string.length': `currency field in the request body must be {#limit} characters`,
                    'any.only':`invalid currency code`,
                    'string.base': 'currency field in the request body should be of type string',
                    'string.empty': 'currency cannot be an empty field in the request body',
                    'any.required': 'currency is a required field in the request body'
                }),
            customerId: Joi.number()
                .required()
                .messages({
                    'number.base': 'customerId field in the request body should be of type string',
                    'number.empty': 'customerId cannot be an empty field in the request body',
                    'any.required': 'customerId is a required field in the request body'
                }),


        }).options({stripUnknown: true});

        const { error, value } = schema.validate(data);

        if(error){
            throw({
                status:400,
                name:'validationError',
                message:error.message
            });
        }

        return value;
    }
}
