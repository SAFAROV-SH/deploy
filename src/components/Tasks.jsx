import { useState, useEffect } from 'react';
import Header from './Header';
import Loading from './Loading';
import '../css/Tasks.css';
import { motion } from 'framer-motion';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [checkingTaskId, setCheckingTaskId] = useState(null); // Track specific task being checked

    // Function to fetch tasks
    const fetchTasks = async () => {
        try {
            const response = await fetch('https://probots.uz/api/tasks.php?user_id=' + user.id);
            if (!response.ok) {
                throw new Error('Ma\'lumotlarni yuklashda xatolik yuz berdi');
            }

            const data = await response.json();
            setTasks(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
            console.error('Xatolik:', err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Function to check task completion status
    const handleTaskClick = async (task) => {
        if (task.completed || checkingTaskId !== null) return;
        
        setCheckingTaskId(task.id); // Set the specific task ID being checked
        try {
            // Send request to check if user is subscribed
            const response = await fetch('https://probots.uz/api/taskcheck.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user.id,
                    task_id: task.id
                })
            });
            
            if (!response.ok) {
                throw new Error('Tekshirishda xatolik yuz berdi');
            }
            
            const result = await response.text();
            alert(response)
            alert(result)
            if (result.trim() === 'ok') {
                // If subscribed, reload tasks
                await fetchTasks();
            } else if (result.trim() === 'no') {
                // If not subscribed, redirect to the task URL
                if (task.url) {
                    // window.open(task.url, '_blank');
                }
            }
        } catch (err) {
            console.error('Task tekshirishda xatolik:', err);
            alert(err)
            // Still open URL on error for better UX
            if (task.url) {
                // window.open(task.url, '_blank');
            }
        } finally {
            setCheckingTaskId(null); // Reset checking state
        }
    };

    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const totalBonuses = tasks.reduce((sum, task) => {
        const bonusMatch = task.description?.match(/(\d+) bonus/);
        return sum + (bonusMatch ? parseInt(bonusMatch[1]) : 0);
    }, 0);

    if (loading) {
        return (
            <>
                <Header />
                <Loading />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="content-container">
                    <div className="error-container">
                        <i className="fas fa-exclamation-circle"></i>
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()}>Qayta urinish</button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="content-container">
                <motion.div 
                    className="rewards-banner"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="rewards-banner-icon">
                        <motion.i 
                            className="fas fa-crown"
                            animate={{ 
                                scale: [1, 1.2, 1],
                                rotateY: [0, 360],
                                color: ['#ffd700', '#ffaa00', '#ffd700']
                            }}
                            transition={{ 
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "loop"
                            }}
                        ></motion.i>
                    </div>
                    <div className="rewards-banner-content">
                        <h2>BONUSLARNI OLING!</h2>
                        <p>Ijtimoiy tarmoqlarni ulab, jami <span className="highlight-bonus">{totalBonuses} So'm</span> yig'ib oling!</p>
                    </div>
                </motion.div>

                <div className="social-tasks">
                    {tasks.map(task => (
                        <motion.div
                            key={task.id}
                            className={`social-task-item ${task.completed ? 'completed' : ''}`}
                            onClick={() => handleTaskClick(task)}
                            animate={{
                                opacity: task.completed ? 1 : 0.9,
                                boxShadow: task.completed ? "none" : "0 0 15px rgba(255, 255, 255, 0.8)",
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: task.completed ? 0 : Infinity,
                                repeatType: "loop",
                                ease: "easeInOut",
                            }}
                        >
                            <div className={`social-task-icon ${task.type}`}>
                                <motion.i
                                    className={task.icon}
                                    animate={
                                        task.type === 'telegram'
                                            ? {
                                                x: [0, 1, -1, 0],
                                                y: [0, -1, 0],
                                                rotate: [0, 5, -5, 0],
                                                opacity: [1, 0.9, 1],
                                            }
                                            : {}
                                    }
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        ease: "easeInOut",
                                    }}
                                ></motion.i>
                            </div>
                            <div className="social-task-info">
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                            </div>
                            <div className="social-task-action">
                                {task.completed ? (
                                    <i className="fas fa-check-circle"></i>
                                ) : checkingTaskId === task.id ? (
                                    <i className="fas fa-spinner fa-spin"></i>
                                ) : (
                                    <i className="fas fa-chevron-right"></i>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="task-bonus-card">
                    <div className="task-bonus-icon">
                        <motion.i
                            className="fas fa-gift"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [1, 0.8, 1],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: "loop",
                                ease: "easeInOut",
                            }}
                        ></motion.i>
                    </div>
                    <div className="task-bonus-info">
                        <h3>Barcha vazifalarni bajaring!</h3>
                        <p>Barcha ijtimoiy tarmoqlarni ulab, qo'shimcha 100 bonus oling</p>
                        <div className="task-progress-bar">
                            <div className="task-progress-fill" style={{ width: `${(completedTasks / totalTasks) * 100}%` }}></div>
                        </div>
                        <div className="task-progress-info">
                            <span>{completedTasks}/{totalTasks} vazifa bajarildi</span>
                            <span>Qoldi: {totalTasks - completedTasks} ta</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Tasks;