import importlib.util
import sys
import os
def create_bridge(python_path, pcg_path, ppg_path):
    print(f'12345678: {os.path.basename(python_path)}')
    python_calc_module = os.path.splitext(os.path.basename(python_path))[0]
    spec = importlib.util.spec_from_file_location(python_calc_module, python_path)
    calculation_module = importlib.util.module_from_spec(spec)
    sys.modules[python_calc_module] = calculation_module
    spec.loader.exec_module(calculation_module)
    return calculation_module.calculate(pcg_path, ppg_path)
