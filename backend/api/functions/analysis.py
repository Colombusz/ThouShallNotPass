# This will be used for the Entropy calculation
import math
import hashlib
import requests

def calculate_entropy(password):
    """Calculate password entropy in bits."""
    length = len(password)
    pool_size = 0

    # Estimate pool size based on character types
    if any(c.islower() for c in password): pool_size += 26
    if any(c.isupper() for c in password): pool_size += 26
    if any(c.isdigit() for c in password): pool_size += 10
    if any(c in '!@#$%^&*()-_=+[]{};:,.<>/?' for c in password): pool_size += 32  # Special chars

    # Entropy formula: length * log2(pool_size)
    entropy = length * math.log2(pool_size) if pool_size > 0 else 0
    return entropy

def pwned_api_check(password):
    sha1password = hashlib.sha1(password.encode('utf-8')).hexdigest().upper()
    first5_char, tail = sha1password[:5], sha1password[5:]
    
    url = 'https://api.pwnedpasswords.com/range/' + first5_char
    res = requests.get(url)
    if res.status_code != 200:
        raise RuntimeError(f'Error fetching: {res.status_code}, check the API and try again')
    
    hashes = (line.split(':') for line in res.text.splitlines())
    for h, count in hashes:
        if h == tail:
            return int(count)
    return 0