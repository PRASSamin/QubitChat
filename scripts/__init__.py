"""
Author: PRAS

Description:
    This module serves as the initialization file for a set of scripts used throughout multiple phases of React Native project builds. 
    It contains essential configuration settings, constants, and variables that are utilized across various scripts within the folder. 

    The purpose of this file is to provide a centralized location for all globally shared settings and resources that are accessed by 
    different scripts during different stages of the build process. This approach ensures consistency across scripts and simplifies 
    maintenance when project-specific configurations need to be updated.

    This file is imported and utilized by several scripts, making it a crucial component in the overall workflow of React Native project 
    building and related tasks.
"""
import os

# ANSI color codes
RESET = "\033[0m"
BOLD = "\033[1m"
RED = "\033[31m"
GREEN = "\033[32m"
YELLOW = "\033[33m"
BLUE = "\033[34m"
MAGENTA = "\033[35m"
CYAN = "\033[36m"

def INFO(message):
    print(f"{BOLD}{GREEN}[INFO]{RESET} {message}")
    
def SUCCESS(message):
    print(f"{BOLD}{BLUE}[SUCCESS]{RESET} {message}")

def WARNING(message):
    print(f"{BOLD}{YELLOW}[WARNING]{RESET} {message}")

def ERROR(message):
    print(f"{BOLD}{RED}[ERROR]{RESET} {message}")
    
    
ROOT = os.path.abspath(os.getcwd())

__all__ = ["INFO", "SUCCESS", "WARNING", "ERROR", "ROOT"]