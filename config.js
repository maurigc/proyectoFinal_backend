const config = {
    mongoDb: {
        url: process.env.URL_MONGO_LOCAL,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    firebase:{
        options: {
            "type": "service_account",
            "project_id": "backend-c32125",
            "private_key_id": "9f1fe5ea6f21c4ea73d059148a935cb3f708be49",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC6E4XAIVPv/Y2l\nRwLM5TLoLch7unBax3Uau1rzKtzSz4BPYvD9GIiltU9NgDw1cRPlM0u37JEbgOU+\nC9OOIoxHxexPM4cOLfyQGu/tVL6+BipSU4YHtP7CJTBsTeoRReTYDuTnEx5jWHG8\nT+22BQSfORN+aVWUbEBwaevFQqFdomXuGe/9z96DgngAfxGbEo9t9Gv77p2EoguZ\ns0W3RctmoVR6taSD2zg8DKSnCUagKX3TGYwu/2dDikDPlrBzn8wr8iH9B9tD+LiL\nABwcvclq/Q+ok30cFNob3WrSpMe7TAX44NkkZ3CLNOOlP1aVGcLTqoYrp85RwCbE\n5BblMNkXAgMBAAECggEACDlwrKCh0HZehQhHIWidVWcgo1yxi/Gg8BYz25JGFwiW\nMpa8Rr4yMVDQOSwKfTo1l5Mq15hHLvYFgTaN7+GrCEkWkXGaQzrZHO1z3q444raX\nDEh7dhUT5Yo17Qjh6Eg0kzAlVz6gazeviek70n2/nzdV8JJrS+zKSa2vfr/b2K2P\nlIDAbX62b/Xych2G4JuxKzq7qctqntI73yf+d4Hj3D5eA9VQj1valX5uAWMtzTfl\nAe54JwIiHKa/1MoG7R7IKviqOZ564Gp0QqCIQxbRNMa/oA2EZUSYKeZkb1odEKKz\n/YgQqlbJgxbqCQTJ3DVv7IFg7iWmx8q0kwrxnpYL4QKBgQDbwGBPtagxACZNFCWE\nJqqcqxfkogGhHWr7G8rjujD9keDGdOUr6vCOLBRzJk3kkMHAHLidoPrgNtp1Gevd\no6Q2jUBwKOywd3+03uRlF7+gEyTd9nI4RbeA3VnRBPo5GwkBP6hf54kusWHrUa84\nxt+aMGNa9QHY3VlSg3wXObPuGQKBgQDYxR2lYs2ZAkuES/oEZhj1Y9W7rtlyg2ue\nAjDxyxZGIWJ/kewgv+JNjzPN1EqRN/fGvgZ8H2cd3raWberVeu42yILs9RjTV/3Q\nuvHN6cuGSxAwn5Zq8nCqRacoaIOTRfXl43XKRgyFcOlvs2i9gP0MetzfA95C+0CP\nDHs02xCGrwKBgHXYJ433Y9fLNb72A9xng+z6T5jbTDZjeUBqOhZ/fdAtj7W9cDxq\nBFCp0Nmje/gLrOtiO5rEfmUI5YQQv40fOWvLufer6qoDm2eadC7GWov0WDvz8nK8\n6Fhh282cdrdzCRQzWA7+MnHozBMOvgGbnMOqGU3ov/HVWhZGzqAB4LzZAoGBAJD3\nIeBctwpAkqgi90zByqcw4NrnD9yZLvs4k+rf2kGESg7uU2+DY6BiyE46TrPXLgjn\nRAb2KUu8iXcIgyfJUk2owoYdU0Djc4aHvvXqCIYC5QzfbQSQpe/5LNTFMFjpTI01\nFKz1M6J55GMjJES3YoNaFyO9voIk7QO9YRfz+JVZAoGAVK9fP5hZ8TeqwlcnI4ok\nMlvr3MUZ+xChTrramO7pwcDlfm3+UdMhWI2NveYTt4UB5kGt1RICGb74unSyPFPW\nFI28Z/tEiQubp2VtWVW3EnLVN9onnB/nPeHQBf4XAhXkyUKTzTUL39zY5jOufHgj\nEBIN9ylXKwRHiJaldryOtsk=\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-hyh0w@backend-c32125.iam.gserviceaccount.com",
            "client_id": "101828998831717525989",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hyh0w%40backend-c32125.iam.gserviceaccount.com"
          }
          
    }
}


export { config };