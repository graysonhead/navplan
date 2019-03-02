from setuptools import setup, find_namespace_packages


setup(
    name='npserver',
    version='1.0.0',
    packages=find_namespace_packages(include=['npserver.*']),
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'flask',
        'flask-sqlalchemy',
        'flask-restless',
        'sqlalchemy-migrate'
    ]

)