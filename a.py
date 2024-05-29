from cryptography.fernet import Fernet

def decrypt_string(encrypted_string, key):
    f = Fernet(key)
    decrypted_string = f.decrypt(encrypted_string)
    return decrypted_string.decode()

encrypted_string = "gAAAAABmEFt1oVvGJSN7LvtZKizjsKhGRDH74ZaSiDOzImCIZGs-kCAc4d-PGibSbvHLHjOwEsge9r9GRPXgxXF87owsvbRcrLxdGfjd5W1EQF2rszVjukQ8LP_yla1XKJ7nNsUWbJXpZxIV7qc2ALoxgqckbHmCd7TI7VQTKQ1ck7yGlF5AM0ZQltQlK8FG_TMLrqWYhP5Pd27mUP-FftEIjRvvuToPKg=="
key = "45crfiiAQhA54YtZNBNUjWp03ban2Vku8MD6SpY-C6Y="

print(decrypt_string(encrypted_string, key))