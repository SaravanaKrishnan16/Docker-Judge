# Python 3 Execution Environment
# Minimal, secure, non-root execution
FROM python:3.11-slim

# Set working directory
WORKDIR /tmp/code

# Create non-root user
RUN useradd -m -u 1000 executor && \
    chown -R executor:executor /tmp/code

# Set Python to unbuffered output
ENV PYTHONUNBUFFERED=1

# Remove unnecessary packages
RUN apt-get update && \
    apt-get remove -y --purge apt-utils && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Switch to non-root user
USER executor

# Default command (can be overridden)
CMD ["python3"]
