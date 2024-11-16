# This will be used for the Entropy calculation
import math

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
