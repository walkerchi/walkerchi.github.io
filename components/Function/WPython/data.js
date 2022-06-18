const data = {
    __init__:`
    import matplotlib
    import matplotlib.pyplot as plt
    import numpy as np
    import scipy
    import sklearn 
    matplotlib.use("module://matplotlib.backends.html5_canvas_backend")
    `,
    packages:[
        {
            name:'autograd'
        },
        {
            name:'numpy'
        },
        {
            name:'scikit-learn'
        },
        {
            name:'scipy'
        },
        {
            name:'sympy'
        },
        {
            name:'networkx'
        },
        {
            name:'matplotlib'
        },
        {
            name:'tqdm'
        }
    ]
}
export default data