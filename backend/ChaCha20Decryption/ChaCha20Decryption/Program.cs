using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using Sodium; // We need to import the Sodium library for ChaCha20

class Program
{
    static void Main()
    {
        // File paths for the encrypted and decrypted files
        string encryptedFilePath = "PO-encrypted.pdf";
        string decryptedFilePath = "PO-decrypted.pdf";

        // The password used to encrypt the file (all lowercase, no spaces)
        string password = "whodrinksroots";

        // Nonce (IV) used during encryption
        byte[] nonce = Encoding.ASCII.GetBytes("abcdefgh");

        // Deriving the key from the password using SHA256
        using (SHA256 sha256 = SHA256.Create())
        {
            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
            byte[] key = sha256.ComputeHash(passwordBytes);

            // Read the encrypted file into a byte array
            byte[] encryptedData = File.ReadAllBytes(encryptedFilePath);

            // Decrypt the data using ChaCha20
            byte[] decryptedData = DecryptChaCha20(encryptedData, key, nonce);

            // Write the decrypted data to a new file
            File.WriteAllBytes(decryptedFilePath, decryptedData);

            Console.WriteLine("Decryption complete. The file has been saved to " + decryptedFilePath);
        }
    }

    // Method to decrypt data using ChaCha20
    static byte[] DecryptChaCha20(byte[] encryptedData, byte[] key, byte[] nonce)
    {
        // Initialize the ChaCha20 cipher
        var chacha20 = new ChaCha20(key, nonce);

        // Decrypt the encrypted data
        byte[] decryptedData = new byte[encryptedData.Length];
        chacha20.Decrypt(encryptedData, decryptedData);

        return decryptedData;
    }
}