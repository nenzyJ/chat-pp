import { v2 as cloudinary } from 'cloudinary';
import {ENV} from './env.js';

cloudinary.config({
    cloud_name: ENV.CLOUNDINARY_CLOUD_NAME,
    api_key: ENV.CLOUNDINARY_API_KEY,
    api_secret: ENV.CLOUNDINARY_API_SECRET,
});

export default cloudinary;