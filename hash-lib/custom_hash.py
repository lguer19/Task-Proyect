import hashlib

def custom_hash(cadena: str, number: int):
    # Invertir la cadena
    reversed_string = cadena[::-1]

    # Usar una lista para almacenar los valores elevados al cuadrado
    squared_digits_list = []
    
    # Elevar el número al cuadrado
    for num in str(number):
        squared_value = int(num) ** 2
        squared_digits_list.append(str(squared_value))

    # Unir los elementos de la lista en una sola cadena
    squared_digits = "".join(squared_digits_list)
    
    # Unir los valores
    combined_string = reversed_string + squared_digits
    
    # Generar el hash SHA-256
    sha256_hash = hashlib.sha256(combined_string.encode()).hexdigest()
    
    print("Cadena procesada: " + combined_string)
    print("SHA-256 Hash: " + sha256_hash)

    return sha256_hash

# Ejemplo de uso
if __name__ == "__main__":
    cadena = input("Ingrese la cadena: ")
    number = int(input("Ingrese un número: "))
    custom_hash(cadena, number)
